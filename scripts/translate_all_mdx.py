import requests
import re
import time
import os
import json
import hashlib
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

TILMOCH_API_URL = "https://websocket.tahrirchi.uz/translate-v2"
TILMOCH_API_KEY = os.getenv("TILMOCH_API_KEY")
SOURCE_LANG = "eng_Latn"
TARGET_LANG = "uzn_Latn"
MODEL = "tilmoch"

DOCS_DIR = Path("samples")
OUTPUT_DIR = Path("sample_translation/docs_uz")
CACHE_FILE = Path("sample_translation/translation_cache.json")
MIN_BATCH_SIZE = 800  # Minimum characters before sending translation request
BATCH_SEPARATOR = "\n|||TRANSLATE_SPLIT|||\n"  # Unique separator for batching

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

def translate_with_tilmoch(text: str) -> str:
    """Translate text using Tilmoch/Sayqalchi API with caching."""
    if not text or not text.strip():
        return text
    
    # Check cache first
    text_hash = get_text_hash(text)
    if text_hash in translation_cache:
        return translation_cache[text_hash]
    
    try:
        print(f"[API CALL] Translating {len(text)} chars: {text[:50]}...")
        response = requests.post(
            TILMOCH_API_URL,
            json={
                "text": text,
                "source_lang": SOURCE_LANG,
                "target_lang": TARGET_LANG,
                "model": MODEL,
            },
            headers={
                "Authorization": TILMOCH_API_KEY,
                "Content-Type": "application/json",
            },
            timeout=30,
        )
        
        if response.status_code != 200:
            print(f"[ERROR] API returned status {response.status_code}")
            return text
        
        result = response.json()
        translated = result.get("translated_text", text)
        
        # Cache the translation
        translation_cache[text_hash] = translated
        
        time.sleep(0.2)  # Rate limiting
        return translated
    except Exception as e:
        print(f"[ERROR] Translation failed: {str(e)}")
        return text


def translate_batch(texts: list) -> list:
    """Translate multiple texts in a single API call."""
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
        return results
    
    # Batch texts together with separator
    indices = [idx for idx, _ in texts_to_translate]
    batch_texts = [text for _, text in texts_to_translate]
    combined_text = BATCH_SEPARATOR.join(batch_texts)
    
    # Translate the batch
    try:
        print(f"[BATCH API] Translating {len(batch_texts)} texts ({len(combined_text)} chars)")
        response = requests.post(
            TILMOCH_API_URL,
            json={
                "text": combined_text,
                "source_lang": SOURCE_LANG,
                "target_lang": TARGET_LANG,
                "model": MODEL,
            },
            headers={
                "Authorization": TILMOCH_API_KEY,
                "Content-Type": "application/json",
            },
            timeout=30,
        )
        
        if response.status_code != 200:
            print(f"[ERROR] Batch API returned status {response.status_code}")
            # Fallback to original texts
            for idx, text in texts_to_translate:
                results[idx] = text
            return results
        
        result = response.json()
        translated_combined = result.get("translated_text", combined_text)
        
        # Split back into individual translations
        translated_parts = translated_combined.split(BATCH_SEPARATOR)
        
        # Handle case where split doesn't match (API changed the separator)
        if len(translated_parts) != len(batch_texts):
            print(f"[WARNING] Batch split mismatch (expected {len(batch_texts)}, got {len(translated_parts)})")
            print(f"[FALLBACK] Translating {len(batch_texts)} texts individually...")
            
            # Fallback: translate each text individually
            for idx, text in texts_to_translate:
                translated = translate_with_tilmoch(text)
                text_hash = get_text_hash(text)
                translation_cache[text_hash] = translated
                results[idx] = translated
        else:
            # Cache and assign results
            for (idx, original_text), translated_text in zip(texts_to_translate, translated_parts):
                text_hash = get_text_hash(original_text)
                translation_cache[text_hash] = translated_text
                results[idx] = translated_text
        
        time.sleep(0.3)  # Rate limiting
        
    except Exception as e:
        print(f"[ERROR] Batch translation failed: {str(e)}")
        # Fallback to original texts
        for idx, text in texts_to_translate:
            results[idx] = text
    
    return results


def translate_mdx(mdx_content: str) -> str:
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
        
        # Skip lines that are just URLs
        if stripped.startswith(("http://", "https://", "www.")):
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
    
    # === PASS 2: Batch translate ===
    print(f"[BATCH] Collected {len(texts_to_translate)} lines for translation")
    
    if texts_to_translate:
        # Extract just the texts (handle both 3 and 4 element tuples)
        texts = []
        for item in texts_to_translate:
            if len(item) >= 3:
                texts.append(item[1])  # text is always second element
        
        # Batch translate in chunks
        translated_texts = []
        for i in range(0, len(texts), 50):
            batch = texts[i:i+50]
            translated_batch = translate_batch(batch)
            translated_texts.extend(translated_batch)
        
        # Map translations back to line indices
        for item, translated_text in zip(texts_to_translate, translated_texts):
            line_idx = item[0]
            original_text = item[1]
            line_type = item[2]
            extra_data = item[3] if len(item) > 3 else None
            line_translations[line_idx] = (translated_text, line_type, original_text, extra_data)
        
        # Save cache
        save_cache(translation_cache)
    
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


def translate_file(input_path: Path, output_path: Path):
    """Translate a single MDX file."""
    try:
        print(f"\n{'='*80}")
        print(f"Processing: {input_path}")
        print(f"{'='*80}")
        
        # Read the file
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Translate
        translated_content = translate_mdx(content)
        
        # Create output directory if it doesn't exist
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Write the translated file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)
        
        print(f"[SUCCESS] Translated: {input_path} -> {output_path}")
        
    except Exception as e:
        print(f"[ERROR] Failed to translate {input_path}: {str(e)}")


def translate_all_mdx_files(force_retranslate=False):
    """Translate all MDX files from docs directory.
    
    Args:
        force_retranslate: If True, retranslate existing files. Default False.
    """
    if not TILMOCH_API_KEY:
        print("[ERROR] TILMOCH_API_KEY not found in environment variables!")
        print("Please set it in your .env file")
        return
    
    print(f"Starting translation of all MDX files...")
    print(f"Source: {DOCS_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Cache: {CACHE_FILE}")
    print(f"Force retranslate: {force_retranslate}")
    
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
    
    # Translate each file
    start_time = time.time()
    completed = 0
    failed = 0
    
    for i, (mdx_file, output_path) in enumerate(files_to_translate, 1):
        print(f"\n[{i}/{len(files_to_translate)}] ({completed} completed, {failed} failed)")
        
        try:
            translate_file(mdx_file, output_path)
            completed += 1
        except Exception as e:
            print(f"[ERROR] Failed: {e}")
            failed += 1
    
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
    
    translate_all_mdx_files(force_retranslate=force_retranslate)

