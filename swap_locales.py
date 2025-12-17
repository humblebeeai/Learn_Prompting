#!/usr/bin/env python3
"""
Script to swap locale content:
- Move Uzbek translations from i18n/uz/ to docs/
- Move English content from docs/ to i18n/en/
"""

import os
import shutil
from pathlib import Path

# Paths
DOCS_DIR = Path("docs")
UZ_DIR = Path("i18n/uz/docusaurus-plugin-content-docs/current")
EN_DIR = Path("i18n/en/docusaurus-plugin-content-docs/current")

# Create English translation directory if it doesn't exist
EN_DIR.mkdir(parents=True, exist_ok=True)

def swap_category_files():
    """Swap all _category_.json files"""
    print("=" * 80)
    print("Swapping _category_.json files to make Uzbek the default")
    print("=" * 80)
    
    # Find all category files in Uzbek translation
    uz_categories = list(UZ_DIR.rglob("_category_.json"))
    print(f"\nFound {len(uz_categories)} Uzbek category files")
    
    for uz_file in uz_categories:
        # Get relative path
        rel_path = uz_file.relative_to(UZ_DIR)
        docs_file = DOCS_DIR / rel_path
        en_file = EN_DIR / rel_path
        
        if docs_file.exists():
            # 1. Copy English (docs) to i18n/en/ 
            en_file.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(docs_file, en_file)
            print(f"[EN] {rel_path}")
            
            # 2. Copy Uzbek (i18n/uz) to docs/
            shutil.copy2(uz_file, docs_file)
            print(f"[UZ] {rel_path}")
        else:
            print(f"[SKIP] {rel_path} (doesn't exist in docs/)")
    
    print("\n" + "=" * 80)
    print("Swap completed!")
    print("=" * 80)
    print("\nNow:")
    print("  - docs/ contains Uzbek content (default)")
    print("  - i18n/en/ contains English translations")
    print("  - i18n/uz/ contains backup of Uzbek translations")
    print("\nRestart your dev server: npm start")

if __name__ == "__main__":
    if not DOCS_DIR.exists():
        print("Error: docs/ directory not found")
        exit(1)
    
    if not UZ_DIR.exists():
        print("Error: i18n/uz/ directory not found")
        exit(1)
    
    swap_category_files()

