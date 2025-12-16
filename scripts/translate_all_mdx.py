import requests
import re
import time
import os
import json
import hashlib
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

# OpenAI Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL = "gpt-4.1"
SOURCE_LANG = "English"
TARGET_LANG = "Uzbek (Latin script)"

# Concurrency settings
MAX_CONCURRENT_REQUESTS = 10
semaphore = None  # Will be initialized in async context

# Progress tracking
translation_counter = 0
translation_lock = None  # Will be initialized in async context

# Token tracking
total_input_tokens = 0
total_output_tokens = 0
total_cost = 0.0

# GPT-4.1 pricing 
# input tokens are 2.00$ per 1M tokens
# output tokens are 0.5 $ per 1M tokens
INPUT_TOKEN_COST = 2.00 / 1000000  # $2.00 per 1M input tokens
OUTPUT_TOKEN_COST = 0.50 / 1000000  # $0.50 per 1M output tokens

DOCS_DIR = Path("docs")
OUTPUT_DIR = Path("i18n/uz/docusaurus-plugin-content-docs/current")
CACHE_FILE = Path("i18n/uz/translation_cache.json")
TOKEN_STATS_FILE = Path("i18n/uz/token_stats.json")

os.makedirs(OUTPUT_DIR, exist_ok=True)

MIN_BATCH_SIZE = 800  # Minimum characters before sending translation request
BATCH_SEPARATOR = "\n|||TRANSLATE_SPLIT|||\n"  # Unique separator for batching

# Initialize OpenAI client
client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# Translation system prompt
TRANSLATION_SYSTEM_PROMPT = f"""You are a professional translator specializing in technical documentation translation from {SOURCE_LANG} to {TARGET_LANG}.

CRITICAL RULES:
1. DO NOT translate code blocks, code snippets, or programming syntax
2. DO NOT translate technical terms like:
   - "Few-Shot Prompting", "Zero-Shot", "One-Shot"
   - "Embedding", "Token", "Prompt", "Fine-tuning"
   - "LLM", "GPT", "API"
   - Programming concepts, framework names, library names
   - Variable names, function names, file paths, URLs

3. ONLY translate natural language text (prose, explanations, descriptions)
4. Preserve ALL formatting: markdown syntax, line breaks, spacing, punctuation
5. DO NOT add, remove, or modify any words - translate EXACTLY what is provided
6. DO NOT hallucinate or add explanatory text
7. Match the meaning and tone of the original text precisely
8. Keep the translation natural and understandable in {TARGET_LANG}

When translating, focus on conveying the exact meaning while maintaining technical accuracy and readability."""

def load_cache():
    """Load translation cache from file."""
    if CACHE_FILE.exists():
        try:
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"[WARNING] Could not load cache: {e}")
            return {}
    return {}

def load_token_stats():
    """Load token usage statistics from file."""
    if TOKEN_STATS_FILE.exists():
        try:
            with open(TOKEN_STATS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"[WARNING] Could not load token stats: {e}")
            return {"total_input_tokens": 0, "total_output_tokens": 0, "total_cost": 0.0}
    return {"total_input_tokens": 0, "total_output_tokens": 0, "total_cost": 0.0}

def save_token_stats(stats):
    """Save token usage statistics to file."""
    try:
        TOKEN_STATS_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(TOKEN_STATS_FILE, 'w', encoding='utf-8') as f:
            json.dump(stats, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[ERROR] Could not save token stats: {e}")

def update_token_stats(input_tokens, output_tokens):
    """Update global token statistics and calculate cost."""
    global total_input_tokens, total_output_tokens, total_cost
    
    total_input_tokens += input_tokens
    total_output_tokens += output_tokens
    
    # Calculate cost
    input_cost = input_tokens * INPUT_TOKEN_COST
    output_cost = output_tokens * OUTPUT_TOKEN_COST
    total_cost += input_cost + output_cost
    
    return input_cost + output_cost

def save_cache(cache):
    """Save translation cache to file."""
    try:
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[ERROR] Could not save cache: {e}")

def get_text_hash(text):
    """Generate a hash for text to use as cache key."""
    return hashlib.md5(text.encode('utf-8')).hexdigest()

# Translation cache
translation_cache = load_cache()

async def translate_with_openai(text: str, text_num: int = 0, total: int = 0) -> str:
    """Translate text using OpenAI GPT-4o with caching."""
    global translation_counter
    
    if not text or not text.strip():
        return text
    
    # Check cache first
    text_hash = get_text_hash(text)
    if text_hash in translation_cache:
        async with translation_lock:
            translation_counter += 1
        progress = f"[{translation_counter}/{total}]" if total > 0 else ""
        print(f"[CACHE] {progress} Using cached: {text[:60]}...")
        return translation_cache[text_hash]
    
    async with semaphore:
        try:
            async with translation_lock:
                translation_counter += 1
            
            progress = f"[{translation_counter}/{total}]" if total > 0 else ""
            print(f"[API] {progress} Translating {len(text)} chars: {text[:60]}...")
            
            response = await client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": TRANSLATION_SYSTEM_PROMPT},
                    {"role": "user", "content": f"Translate the following text from {SOURCE_LANG} to {TARGET_LANG}. Remember: DO NOT translate code, technical terms, or add any extra words. Translate ONLY the natural language content:\n\n{text}"}
                ],
                temperature=0.3,
                max_tokens=8192,
            )
            
            translated = response.choices[0].message.content.strip()
            
            # Track tokens
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            cost = update_token_stats(input_tokens, output_tokens)
            
            print(f"[✓] {progress} Cost: ${cost:.4f} | In: {input_tokens} Out: {output_tokens}")
            
            # Cache the translation
            translation_cache[text_hash] = translated
            
            return translated
            
        except Exception as e:
            print(f"[ERROR] {progress} Translation failed: {str(e)}")
            return text


async def translate_batch(texts: list) -> list:
    """Translate multiple texts in a single API call using OpenAI."""
    if not texts:
        return []
    
    # Filter out empty texts and check cache
    texts_to_translate = []
    results = [None] * len(texts)
    
    for i, text in enumerate(texts):
        if not text or not text.strip():
            results[i] = text
            continue
        
        text_hash = get_text_hash(text)
        if text_hash in translation_cache:
            results[i] = translation_cache[text_hash]
        else:
            texts_to_translate.append((i, text))
    
    if not texts_to_translate:
        print(f"[CACHE] All {len(texts)} texts found in cache")
        return results
    
    # Batch texts together with separator
    indices = [idx for idx, _ in texts_to_translate]
    batch_texts = [text for _, text in texts_to_translate]
    combined_text = BATCH_SEPARATOR.join(batch_texts)
    
    # Translate the batch
    async with semaphore:
        try:
            print(f"[BATCH API] Translating {len(batch_texts)} texts ({len(combined_text)} chars)")
            
            response = await client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": TRANSLATION_SYSTEM_PROMPT},
                    {"role": "user", "content": f"""Translate the following texts from {SOURCE_LANG} to {TARGET_LANG}. 
                    
                    The texts are separated by: {BATCH_SEPARATOR}

                    IMPORTANT: 
                    - Keep the EXACT separator "{BATCH_SEPARATOR}" between translations
                    - Maintain the same number of segments as the input

                    Texts to translate:

                    {combined_text}"""}
                                ],
                temperature=0.3,
                max_tokens=8192,
            )
            
            translated_combined = response.choices[0].message.content.strip()
            
            # Track tokens
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            cost = update_token_stats(input_tokens, output_tokens)
            
            print(f"[TOKENS] Input: {input_tokens}, Output: {output_tokens}, Cost: ${cost:.4f}")
            
            # Split back into individual translations
            translated_parts = translated_combined.split(BATCH_SEPARATOR)
            
            # Handle case where split doesn't match (API changed the separator)
            if len(translated_parts) != len(batch_texts):
                print(f"[WARNING] Batch split mismatch (expected {len(batch_texts)}, got {len(translated_parts)})")
                print(f"[FALLBACK] Translating {len(batch_texts)} texts individually...")
                
                # Fallback: translate each text individually (concurrently)
                tasks = []
                for idx, text in texts_to_translate:
                    tasks.append(translate_with_openai(text))
                
                translated_results = await asyncio.gather(*tasks)
                
                for (idx, text), translated in zip(texts_to_translate, translated_results):
                    text_hash = get_text_hash(text)
                    translation_cache[text_hash] = translated
                    results[idx] = translated
            else:
                # Cache and assign results
                for (idx, original_text), translated_text in zip(texts_to_translate, translated_parts):
                    text_hash = get_text_hash(original_text)
                    translation_cache[text_hash] = translated_text
                    results[idx] = translated_text
            
            await asyncio.sleep(0.1)  # Rate limiting for OpenAI
            
        except Exception as e:
            print(f"[ERROR] Batch translation failed: {str(e)}")
            print(f"[FALLBACK] Translating individually...")
            # Fallback to individual translations (concurrently)
            tasks = []
            for idx, text in texts_to_translate:
                tasks.append(translate_with_openai(text))
            
            translated_results = await asyncio.gather(*tasks)
            
            for (idx, text), translated in zip(texts_to_translate, translated_results):
                results[idx] = translated
        
        return results


async def translate_mdx(mdx_content: str) -> str:
    """Translate MDX content - simple line-by-line approach."""
    
    lines = mdx_content.split("\n")
    line_translations = {}  # Maps line index to translated line
    texts_to_translate = []  # List of (line_idx, text) tuples
    
    in_code = False
    in_frontmatter = False
    in_jsx_multiline = False  # For multi-line JSX like <iframe ... >
    code_block_lang = None
    
    # JSX components to SKIP entirely (structural, no translatable content)
    jsx_skip_components = ['Image', 'img', 'video', 'audio']
    
    # HTML tags whose content should be translated
    html_content_tags = ['pre', 'span', 'div', 'p']
    
    jsx_tag_regex = re.compile(r"<[A-Za-z]")  # Any HTML/JSX tag
    jsx_component_regex = re.compile(r"</?([A-Z][a-zA-Z0-9]*)")  # Component tags
    html_tag_regex = re.compile(r"</?([a-z][a-zA-Z0-9]*)")  # HTML tags
    
    # === PASS 1: Identify lines that need translation ===
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Frontmatter
        if i == 0 and stripped == "---":
            in_frontmatter = True
            continue
        if in_frontmatter:
            if stripped == "---":
                in_frontmatter = False
            elif "title:" in line:
                match = re.search(r'title:\s*"([^"]*)"', line)
                if match:
                    title = match.group(1)
                    # Extract emoji if present
                    emoji_match = re.match(r'^([🟡🟢🔴🟣🟠🔵🟤⚪⚫🛸]\s*)', title)
                    emoji_prefix = emoji_match.group(1) if emoji_match else ""
                    title_clean = re.sub(r'[🟡🟢🔴🟣🟠🔵🟤⚪⚫🛸]', '', title).strip()
                    if title_clean:
                        texts_to_translate.append((i, title_clean, 'title', emoji_prefix))
            continue
        
        # Code blocks
        if stripped.startswith("```"):
            if not in_code:
                code_lang_match = re.match(r'```(\w+)', stripped)
                code_block_lang = code_lang_match.group(1) if code_lang_match else None
                in_code = True
            else:
                in_code = False
                code_block_lang = None
            continue
        
        if in_code:
            # Translate code blocks that contain natural language
            # (text, md/markdown blocks contain prose, not actual code)
            if code_block_lang in ["text", "md", "markdown"] and stripped:
                texts_to_translate.append((i, line, 'text_block'))
            continue
        
        # JSX/HTML blocks - distinguish between components with content vs structural JSX
        if jsx_tag_regex.match(stripped):
            # Check if it's a component tag (capitalized)
            comp_match = jsx_component_regex.match(stripped)
            if comp_match:
                component_name = comp_match.group(1)
                
                # Skip structural components
                if component_name in jsx_skip_components:
                    if not stripped.endswith(">"):
                        in_jsx_multiline = True
                    continue
                
                # Process all other JSX components (translate their content)
                # Check if it's a single-line component like <Takeaways>text</Takeaways>
                single_line_pattern = re.compile(rf'<{component_name}[^>]*>(.*?)</{component_name}>')
                single_line_match = single_line_pattern.search(stripped)
                if single_line_match:
                    # Extract content between tags
                    content = single_line_match.group(1).strip()
                    if content and len(content) > 10:
                        texts_to_translate.append((i, content, 'jsx_single_line', component_name))
                # For multi-line components, skip the tag line but process content inside
                continue
            else:
                # Check if it's an HTML tag
                html_match = html_tag_regex.match(stripped)
                if html_match:
                    tag_name = html_match.group(1)
                    # If it's a content tag, skip the tag line but process content inside
                    if tag_name in html_content_tags:
                        continue
                    # Otherwise, it's structural (like iframe, br) - skip it
                    if not stripped.endswith(">"):
                        in_jsx_multiline = True
                    continue
                else:
                    # Other HTML/JSX - skip
                    if not stripped.endswith(">"):
                        in_jsx_multiline = True
                    continue
        
        if in_jsx_multiline:
            if ">" in line and stripped.endswith(">"):
                in_jsx_multiline = False
            continue
        
        # Skip empty lines
        if not stripped:
            continue
        
        # Skip export statements
        if stripped.startswith("export"):
            continue
        

        # Skip lines with only markdown syntax
        if stripped in ["<br />", "<br/>", "---"]:
            continue
        
        # Translate headers
        if stripped.startswith("#"):
            match = re.match(r"^(#{1,6})\s+(.+)$", stripped)
            if match:
                text = match.group(2)
                text_clean = re.sub(r'[🟡🟢🔴🟣🟠🔵🟤⚪⚫🛸]', '', text).strip()
                if text_clean and len(text_clean) > 3:
                    texts_to_translate.append((i, text_clean, 'header'))
            continue
        
        # Translate list items (remove bullet, translate rest)
        if stripped.startswith(("- ", "* ", "1. ", "2. ", "3. ", "4. ", "5. ")):
            # Extract text after bullet
            for prefix in ["- ", "* ", "1. ", "2. ", "3. ", "4. ", "5. "]:
                if stripped.startswith(prefix):
                    text = stripped[len(prefix):].strip()
                    # Check if there's actual text content (not just links/code)
                    # Count alphabetic characters to determine if worth translating
                    alpha_count = sum(1 for c in text if c.isalpha())
                    if alpha_count >= 10:  # Has meaningful text content
                        texts_to_translate.append((i, text, 'list'))
                    break
            continue
        
        # Regular text lines (but not markdown syntax)
        # Skip lines that are pure markdown or don't have letters
        if not any(char.isalpha() for char in stripped):
            continue
        
        # Check if line has actual translatable content
        # Must have: letters, reasonable length, spaces (multiple words)
        word_count = len(stripped.split())
        alpha_count = sum(1 for c in stripped if c.isalpha())
        
        if word_count >= 1 and alpha_count >= 10:
            # Check if line has inline JSX tags (like <Term>...</Term>)
            # If so, mark it as 'text_with_jsx' so we can handle it specially
            if '<' in stripped and '>' in stripped:
                texts_to_translate.append((i, stripped, 'text_with_jsx'))
            else:
                texts_to_translate.append((i, stripped, 'text'))
    
    # === PASS 2: Individual concurrent translation (NO BATCHING) ===
    global translation_counter
    translation_counter = 0
    
    print(f"\n{'='*80}")
    print(f"[START] Translating {len(texts_to_translate)} text segments")
    print(f"[CONCURRENT] Using {MAX_CONCURRENT_REQUESTS} parallel requests")
    print(f"{'='*80}\n")
    
    if texts_to_translate:
        # Extract just the texts (handle both 3 and 4 element tuples)
        texts = []
        for item in texts_to_translate:
            if len(item) >= 3:
                texts.append(item[1])  # text is always second element
        
        # Translate ALL texts individually with concurrency control via semaphore
        total = len(texts)
        translation_tasks = [
            translate_with_openai(text, i+1, total) 
            for i, text in enumerate(texts)
        ]
        
        print(f"[INFO] Starting {total} concurrent translations...")
        translated_texts = await asyncio.gather(*translation_tasks, return_exceptions=True)
        
        # Handle any errors
        for i, result in enumerate(translated_texts):
            if isinstance(result, Exception):
                print(f"[ERROR] Text {i+1} failed: {result}")
                translated_texts[i] = texts[i]  # Keep original on error
        
        print(f"\n[COMPLETE] All {total} texts translated!\n")
        
        # Map translations back to line indices
        for item, translated_text in zip(texts_to_translate, translated_texts):
            line_idx = item[0]
            original_text = item[1]
            line_type = item[2]
            extra_data = item[3] if len(item) > 3 else None
            line_translations[line_idx] = (translated_text, line_type, original_text, extra_data)
        
        # Save cache after each file
        save_cache(translation_cache)
        print(f"[CACHE] Saved {len(translation_cache)} entries\n")
    
    # === PASS 3: Reconstruct document ===
    result_lines = []
    for i, line in enumerate(lines):
        if i in line_translations:
            translated, line_type, original, extra_data = line_translations[i]
            
            if line_type == 'title':
                # Replace title in frontmatter (preserve emoji if present)
                emoji_prefix = extra_data if extra_data else ""
                # Find the full original title with emoji
                match = re.search(r'title:\s*"([^"]*)"', line)
                if match:
                    full_original = match.group(1)
                    new_title = f"{emoji_prefix}{translated}" if emoji_prefix else translated
                    result_lines.append(line.replace(f'"{full_original}"', f'"{new_title}"'))
                else:
                    result_lines.append(line)
            elif line_type == 'header':
                # Replace header text (keep the # symbols)
                match = re.match(r"^(#{1,6})\s+", line)
                if match:
                    prefix = match.group(0)
                    result_lines.append(f"{prefix}{translated}")
                else:
                    result_lines.append(line)
            elif line_type == 'list':
                # Replace list item text (keep the bullet)
                for bullet in ["- ", "* ", "1. ", "2. ", "3. ", "4. ", "5. "]:
                    if line.strip().startswith(bullet):
                        leading = line[:len(line) - len(line.lstrip())]
                        result_lines.append(f"{leading}{bullet}{translated}")
                        break
                else:
                    result_lines.append(line)
            elif line_type == 'text_block':
                # Text code block - replace entire line
                result_lines.append(translated)
            elif line_type == 'jsx_single_line':
                # Single-line JSX component - replace content between tags
                component_name = extra_data
                pattern = re.compile(rf'(<{component_name}[^>]*>)(.*?)(</{component_name}>)')
                result_lines.append(pattern.sub(rf'\1{translated}\3', line))
            else:
                # Regular text line or text with inline JSX - replace entire line
                # Note: inline JSX tags are preserved in the translation
                result_lines.append(translated)
        else:
            result_lines.append(line)
    
    return "\n".join(result_lines)


async def translate_file(input_path: Path, output_path: Path, file_num: int = 0, total_files: int = 0):
    """Translate a single MDX file."""
    try:
        file_progress = f"[{file_num}/{total_files}]" if total_files > 0 else ""
        
        print(f"\n{'='*80}")
        print(f"📄 {file_progress} Processing: {input_path.name}")
        print(f"{'='*80}")
        
        # Read the file
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"[INFO] File size: {len(content)} chars")
        
        # Translate
        translated_content = await translate_mdx(content)
        
        # Create output directory if it doesn't exist
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Write the translated file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)
        
        print(f"\n✅ {file_progress} SUCCESS: {input_path.name}")
        print(f"   Output: {output_path}")
        
    except Exception as e:
        print(f"\n❌ {file_progress} ERROR: {input_path.name}")
        print(f"   Error: {str(e)}")


async def translate_all_mdx_files(force_retranslate=False):
    """Translate all MDX files from docs directory.
    
    Args:
        force_retranslate: If True, retranslate existing files. Default False.
    """
    global total_input_tokens, total_output_tokens, total_cost, semaphore, translation_lock
    
    # Initialize semaphore for concurrent requests and lock for progress counter
    semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)
    translation_lock = asyncio.Lock()
    
    if not OPENAI_API_KEY:
        print("[ERROR] OPENAI_API_KEY not found in environment variables!")
        print("Please set it in your .env file")
        return
    
    # Load existing token stats
    token_stats = load_token_stats()
    total_input_tokens = token_stats.get("total_input_tokens", 0)
    total_output_tokens = token_stats.get("total_output_tokens", 0)
    total_cost = token_stats.get("total_cost", 0.0)
    
    print(f"Starting translation of all MDX files...")
    print(f"Source: {DOCS_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Cache: {CACHE_FILE}")
    print(f"Model: {MODEL}")
    print(f"Translation: {SOURCE_LANG} → {TARGET_LANG}")
    print(f"Force retranslate: {force_retranslate}")
    print(f"Previous token usage: Input={total_input_tokens:,}, Output={total_output_tokens:,}, Cost=${total_cost:.4f}")
    
    # Find all MDX files
    mdx_files = list(DOCS_DIR.rglob("*.mdx"))
    print(f"\nFound {len(mdx_files)} MDX files to translate")
    
    # Count how many need translation
    files_to_translate = []
    skipped_up_to_date = 0
    
    for mdx_file in mdx_files:
        rel_path = mdx_file.relative_to(DOCS_DIR)
        output_path = OUTPUT_DIR / rel_path
        
        if force_retranslate:
            files_to_translate.append((mdx_file, output_path))
        elif not output_path.exists():
            # File doesn't exist, needs translation
            files_to_translate.append((mdx_file, output_path))
        else:
            # Check if source is newer than translated file
            source_mtime = mdx_file.stat().st_mtime
            output_mtime = output_path.stat().st_mtime
            
            if source_mtime > output_mtime:
                # Source was modified after translation, retranslate
                files_to_translate.append((mdx_file, output_path))
            else:
                # Translation is up to date
                skipped_up_to_date += 1
    
    if not files_to_translate:
        print("\n[INFO] All files are already translated and up to date!")
        print(f"Skipped: {skipped_up_to_date} files (already translated)")
        print("Use --force to retranslate existing files")
        return
    
    print(f"\nFiles to translate: {len(files_to_translate)}")
    print(f"Files skipped (up to date): {skipped_up_to_date}")
    print(f"Total files: {len(mdx_files)}")
    print(f"Concurrent requests: {MAX_CONCURRENT_REQUESTS}")
    
    # Translate files concurrently
    start_time = time.time()
    completed = 0
    failed = 0
    
    # Create tasks for all files
    total_files = len(files_to_translate)
    tasks = []
    
    print(f"\n{'='*80}")
    print(f"🚀 STARTING CONCURRENT TRANSLATION")
    print(f"{'='*80}")
    print(f"Files to translate: {total_files}")
    print(f"Concurrent requests: {MAX_CONCURRENT_REQUESTS}")
    print(f"{'='*80}\n")
    
    for i, (mdx_file, output_path) in enumerate(files_to_translate, 1):
        tasks.append(translate_file(mdx_file, output_path, i, total_files))
    
    # Process all files concurrently with error handling
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Count successes and failures
    for result in results:
        if isinstance(result, Exception):
            print(f"[ERROR] Failed: {result}")
            failed += 1
        else:
            completed += 1
    
    # Save token stats
    token_stats = {
        "total_input_tokens": total_input_tokens,
        "total_output_tokens": total_output_tokens,
        "total_cost": total_cost,
        "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    save_token_stats(token_stats)
    
    # Summary
    elapsed = time.time() - start_time
    print(f"\n{'='*80}")
    print(f"TRANSLATION SUMMARY")
    print(f"{'='*80}")
    print(f"Total files in docs:    {len(mdx_files)}")
    print(f"Skipped (up to date):   {skipped_up_to_date}")
    print(f"Translated:             {len(files_to_translate)}")
    print(f"  - Successfully:       {completed}")
    print(f"  - Failed:             {failed}")
    print(f"Time elapsed:           {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")
    if completed > 0:
        print(f"Average per file:       {elapsed/completed:.1f} seconds")
    print(f"\n{'='*80}")
    print(f"TOKEN USAGE & COST")
    print(f"{'='*80}")
    print(f"Input tokens:           {total_input_tokens:,}")
    print(f"Output tokens:          {total_output_tokens:,}")
    print(f"Total tokens:           {total_input_tokens + total_output_tokens:,}")
    print(f"Total cost (USD):       ${total_cost:.4f}")
    print(f"Model:                  {MODEL}")
    print(f"Token stats file:       {TOKEN_STATS_FILE}")
    print(f"\n{'='*80}")
    print(f"FILES & CACHE")
    print(f"{'='*80}")
    print(f"Cache entries:          {len(translation_cache)}")
    print(f"Output directory:       {OUTPUT_DIR}")
    print(f"Cache file:             {CACHE_FILE}")
    print(f"{'='*80}")
    
    # Cost savings info
    if skipped_up_to_date > 0:
        print(f"\n💰 Saved translation cost by skipping {skipped_up_to_date} up-to-date files!")
        print(f"   To retranslate all files, use: python scripts/translate_all_mdx.py --force")


if __name__ == "__main__":
    import sys
    
    # Check for --force flag
    force_retranslate = "--force" in sys.argv or "-f" in sys.argv
    
    # Run the async function
    asyncio.run(translate_all_mdx_files(force_retranslate=force_retranslate))

