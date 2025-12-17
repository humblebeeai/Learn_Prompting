#!/usr/bin/env python3
"""
Script to fix common MDX issues in Learn Prompting documentation.

Fixes:
1. Remove images that don't exist in folders
2. Remove orphaned closing </div> tags
3. Fix citation formatting (remove spaces between consecutive citations)
4. Convert <Takeaways> components to plain markdown bullet points
5. Replace unprofessional <AIInput> and <AIOutput> components with markdown
6. Convert <Note> components to italic text
7. Convert <Term> components to plain text
8. Remove |||TRANSLATE_SPLIT||| markers
"""
import re
from pathlib import Path
from typing import List, Tuple


def check_image_exists(image_path: str, base_dir: Path) -> bool:
    """Check if an image file exists in the project."""
    # Remove leading /docs/ if present as it refers to static/docs
    clean_path = image_path.replace("/docs/", "")
    
    # Check in static folder
    static_path = base_dir / "static" / clean_path
    if static_path.exists():
        return True
    
    # Check with docs prefix
    docs_static_path = base_dir / "static" / "docs" / clean_path.replace("docs/", "")
    if docs_static_path.exists():
        return True
    
    return False


def remove_missing_images(content: str, base_dir: Path) -> str:
    """Remove image components where the image file doesn't exist."""
    # Pattern to match Image components with src="/..." or src={"/..."}
    # Handles both plain strings and JSX expressions
    image_pattern = r'<div[^>]*>[\s\S]*?<Image[\s\S]*?src=\{?(["\'])([^"\']+)\1\}?[\s\S]*?/>[\s\S]*?</div>[\s\S]*?(?:<br\s*/?>)?'
    
    def replace_image(match):
        full_match = match.group(0)
        image_src = match.group(2)
        
        if check_image_exists(image_src, base_dir):
            print(f"✓ Image exists: {image_src}")
            return full_match
        else:
            print(f"✗ Removing missing image: {image_src}")
            return ""
    
    return re.sub(image_pattern, replace_image, content)


def fix_takeaways_bullets(content: str) -> str:
    """Convert Takeaways components to plain markdown bullet points."""
    # Pattern to match Takeaways component
    takeaways_pattern = r'<Takeaways>([\s\S]*?)</Takeaways>'
    
    def replace_takeaways(match):
        inner_content = match.group(1).strip()
        print("  Converting <Takeaways> to plain bullet points...")
        
        # Extract bullet points
        bullets = re.findall(r'-\s+([^\n-]+(?:\n(?!\s*-)[^\n]+)*)', inner_content)
        if bullets:
            # Format as plain markdown bullets
            formatted_bullets = "\n".join([f"- {bullet.strip()}" for bullet in bullets])
            return f"\n{formatted_bullets}\n"
        
        return match.group(0)
    
    return re.sub(takeaways_pattern, replace_takeaways, content)


def fix_citations(content: str) -> str:
    """Fix citation formatting by removing spaces between consecutive citations and adding space before first citation."""
    original = content
    
    # First, add space before citations that directly follow text (no space)
    # Pattern: word character followed immediately by (@citation)
    content = re.sub(r'([a-zA-Z0-9])\(@', r'\1 (@', content)
    
    # Then, remove spaces between consecutive citations
    # Pattern: )(@cite1) (@cite2) -> )(@cite1)(@cite2)
    content = re.sub(r'\)\s+\(@', ')(@', content)
    
    if content != original:
        print("  Fixing citation formatting...")
    
    return content


def replace_ai_components(content: str) -> str:
    """Replace <AIInput> and <AIOutput> with markdown code blocks."""
    
    # Replace AIInput with markdown code blocks (with or without attributes)
    def replace_input(match):
        title = match.group(1) if match.group(1) else None
        inner_content = match.group(2).strip()
        print("  Replacing <AIInput> with markdown...")
        
        if title:
            # Extract title value
            title_match = re.search(r'title=["\'](.*?)["\']', title)
            if title_match:
                title_text = title_match.group(1)
                return f"\n**Prompt ({title_text}):**\n\n```text\n{inner_content}\n```\n"
        
        return f"\n**Prompt:**\n\n```text\n{inner_content}\n```\n"
    
    content = re.sub(r'<AIInput([^>]*)>([\s\S]*?)</AIInput>', replace_input, content)
    
    # Replace AIOutput with markdown code blocks (with or without attributes)
    def replace_output(match):
        title = match.group(1) if match.group(1) else None
        inner_content = match.group(2).strip()
        print("  Replacing <AIOutput> with markdown...")
        
        if title:
            # Extract title value
            title_match = re.search(r'title=["\'](.*?)["\']', title)
            if title_match:
                title_text = title_match.group(1)
                return f"\n**AI javobi ({title_text}):**\n\n```text\n{inner_content}\n```\n"
        
        return f"\n**AI javobi:**\n\n```text\n{inner_content}\n```\n"
    
    content = re.sub(r'<AIOutput([^>]*)>([\s\S]*?)</AIOutput>', replace_output, content)
    
    return content


def convert_note_to_italic(content: str) -> str:
    """Convert <Note> components to italic text."""
    # Pattern to match Note components
    note_pattern = r'<Note>([\s\S]*?)</Note>'
    
    def replace_note(match):
        inner_content = match.group(1).strip()
        # Remove extra whitespace and newlines, keep single spaces
        cleaned_content = ' '.join(inner_content.split())
        print("  Converting <Note> to italic text...")
        return f"\n*{cleaned_content}*\n"
    
    return re.sub(note_pattern, replace_note, content)


def convert_term_to_plain_text(content: str) -> str:
    """Convert <Term> components to plain text."""
    # Pattern to match Term components
    term_pattern = r'<Term\s+term=["\'](.*?)["\']>(.*?)</Term>'
    
    def replace_term(match):
        term_attr = match.group(1)
        inner_text = match.group(2)
        print(f"  Converting <Term> to plain text...")
        # Just return the inner text
        return inner_text
    
    return re.sub(term_pattern, replace_term, content)


def fix_details_tags(content: str) -> str:
    """Fix <details> tags by ensuring proper structure."""
    # Pattern to match details blocks with unclosed divs
    details_pattern = r'<details[^>]*>\s*<summary[^>]*>(.*?)</summary>\s*<div>(.*?)</details>'
    
    def fix_details(match):
        summary_content = match.group(1).strip()
        div_content = match.group(2).strip()
        print("  Fixing <details> tag structure...")
        # Close the div before closing details
        return f'<details>\n  <summary>{summary_content}</summary>\n  <div>\n    {div_content}\n  </div>\n</details>'
    
    return re.sub(details_pattern, fix_details, content, flags=re.DOTALL)


def remove_orphaned_divs(content: str) -> str:
    """Remove orphaned </div> tags that are standalone on a line."""
    # Pattern to match standalone </div> tags
    orphaned_div_pattern = r'^\s*</div>\s*$'
    
    lines = content.split('\n')
    cleaned_lines = []
    removed_count = 0
    
    for line in lines:
        if re.match(orphaned_div_pattern, line):
            removed_count += 1
            continue
        cleaned_lines.append(line)
    
    if removed_count > 0:
        print(f"  Removing {removed_count} orphaned </div> tag(s)...")
    
    return '\n'.join(cleaned_lines)


def remove_translate_split(content: str) -> str:
    """Remove |||TRANSLATE_SPLIT||| markers."""
    if "|||TRANSLATE_SPLIT|||" in content:
        print("  Removing |||TRANSLATE_SPLIT||| marker...")
        return content.replace("|||TRANSLATE_SPLIT|||", "").strip() + "\n"
    return content


def fix_mdx_file(file_path: Path, base_dir: Path) -> bool:
    """
    Fix all MDX issues in a single file.
    
    Returns:
        bool: True if file was modified, False otherwise
    """
    print(f"\n{'='*60}")
    print(f"Processing: {file_path.relative_to(base_dir)}")
    print(f"{'='*60}")
    
    # Read file
    with open(file_path, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Apply fixes
    content = original_content
    content = remove_missing_images(content, base_dir)
    content = fix_details_tags(content)
    content = remove_orphaned_divs(content)
    content = fix_citations(content)
    content = fix_takeaways_bullets(content)
    content = replace_ai_components(content)
    content = convert_note_to_italic(content)
    content = convert_term_to_plain_text(content)
    content = remove_translate_split(content)
    
    # Check if content changed
    if content != original_content:
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n✓ File updated successfully!")
        return True
    else:
        print(f"\n- No changes needed")
        return False


def fix_all_mdx_files(directory: Path, base_dir: Path, pattern: str = "**/*.mdx") -> Tuple[int, int]:
    """
    Fix all MDX files in a directory.
    
    Returns:
        Tuple[int, int]: (total files processed, files modified)
    """
    mdx_files = list(directory.glob(pattern))
    total = len(mdx_files)
    modified = 0
    
    print(f"\nFound {total} MDX files to process")
    
    for mdx_file in mdx_files:
        if fix_mdx_file(mdx_file, base_dir):
            modified += 1
    
    return total, modified


def main():
    """Main function."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Fix common MDX issues in Learn Prompting documentation"
    )
    parser.add_argument(
        "path",
        nargs="?",
        help="Path to MDX file or directory (default: current directory)",
        default="."
    )
    parser.add_argument(
        "--recursive",
        "-r",
        action="store_true",
        help="Process all MDX files in directory recursively"
    )
    
    args = parser.parse_args()
    
    # Get base directory (project root)
    base_dir = Path(__file__).parent.parent.resolve()
    
    # Get target path
    target_path = Path(args.path).resolve()
    
    if not target_path.exists():
        print(f"Error: Path does not exist: {target_path}")
        return 1
    
    if target_path.is_file():
        # Process single file
        if target_path.suffix == ".mdx":
            fix_mdx_file(target_path, base_dir)
        else:
            print(f"Error: Not an MDX file: {target_path}")
            return 1
    else:
        # Process directory
        if args.recursive:
            total, modified = fix_all_mdx_files(target_path, base_dir)
        else:
            total, modified = fix_all_mdx_files(target_path, base_dir, pattern="*.mdx")
        
        print(f"\n{'='*60}")
        print(f"Summary:")
        print(f"  Total files processed: {total}")
        print(f"  Files modified: {modified}")
        print(f"  Files unchanged: {total - modified}")
        print(f"{'='*60}")
    
    return 0


if __name__ == "__main__":
    exit(main())

