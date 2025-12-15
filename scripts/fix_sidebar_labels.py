import os
import re
import json

DOCS_DIR = "/Users/otabek/Github/Learn_Prompting/docs"

def parse_frontmatter(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
    if not match:
        return None, None
    
    frontmatter = match.group(1)
    
    title_match = re.search(r'title:\s*["\']?(.*?)["\']?$', frontmatter, re.MULTILINE)
    title = title_match.group(1) if title_match else None
    
    pos_match = re.search(r'sidebar_position:\s*(\d+)', frontmatter)
    position = int(pos_match.group(1)) if pos_match else None
    
    return title, position

def create_category_json(folder_path, title, position):
    data = {
        "label": title,
        "link": {
            "type": "doc",
            "id": "page"
        }
    }
    if position is not None:
        data["position"] = position
        
    json_path = os.path.join(folder_path, "_category_.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Created {json_path}")

def main():
    cleaned_count = 0
    for root, dirs, files in os.walk(DOCS_DIR):
        if "page.mdx" in files:
            # Check if _category_.json exists
            if "_category_.json" not in files:
                page_path = os.path.join(root, "page.mdx")
                title, position = parse_frontmatter(page_path)
                
                if title:
                    # Skip if title is empty/None
                    create_category_json(root, title, position)
                    cleaned_count += 1
                else:
                    print(f"Skipping {root}: No title found in page.mdx")
            else:
                 # Check if we should update it? (e.g. for credits/hot_topics which I didn't create properly yet except credits)
                 # I only created credits and writing_emails manually.
                 pass

    print(f"Finished. Created {cleaned_count} _category_.json files.")

if __name__ == "__main__":
    main()
