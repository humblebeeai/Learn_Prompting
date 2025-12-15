#!/usr/bin/env python3
"""Convert MDX files to PDF"""

import os
import re
from pathlib import Path
import markdown
from weasyprint import HTML, CSS

def clean_mdx_content(content):
    """Remove MDX-specific syntax and convert to markdown"""
    # Remove frontmatter
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)
    
    # Remove import statements
    content = re.sub(r'^import .*?;?\n', '', content, flags=re.MULTILINE)
    
    # Convert <Term> components to regular text
    content = re.sub(r'<Term term="([^"]+)">([^<]+)</Term>', r'\2', content)
    
    # Remove other JSX components but keep the content
    content = re.sub(r'<[A-Z][^>]*>([^<]*)</[A-Z][^>]*>', r'\1', content)
    content = re.sub(r'<[A-Z][^/>]*/?>', '', content)
    
    return content

def convert_mdx_to_pdf(mdx_path, output_path):
    """Convert a single MDX file to PDF"""
    print(f"Converting {mdx_path} to {output_path}...")
    
    # Read MDX content
    with open(mdx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Clean MDX content
    cleaned_content = clean_mdx_content(content)
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=[
        'extra', 
        'codehilite',
        'toc',
        'tables',
        'fenced_code'
    ])
    html_content = md.convert(cleaned_content)
    
    # Wrap in HTML template with UTF-8 support
    html_template = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: 'DejaVu Sans', 'Arial', sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 40px auto;
                padding: 20px;
                color: #333;
            }}
            h1, h2, h3, h4, h5, h6 {{
                color: #2c3e50;
                margin-top: 24px;
                margin-bottom: 16px;
            }}
            code {{
                background-color: #f4f4f4;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
            }}
            pre {{
                background-color: #f4f4f4;
                padding: 16px;
                border-radius: 6px;
                overflow-x: auto;
            }}
            pre code {{
                background-color: transparent;
                padding: 0;
            }}
            blockquote {{
                border-left: 4px solid #ddd;
                padding-left: 16px;
                margin-left: 0;
                color: #666;
            }}
            table {{
                border-collapse: collapse;
                width: 100%;
                margin: 20px 0;
            }}
            th, td {{
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }}
            th {{
                background-color: #f4f4f4;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Convert HTML to PDF
    try:
        HTML(string=html_template).write_pdf(output_path)
        print(f"✓ Successfully created {output_path}")
        return True
    except Exception as e:
        print(f"✗ Error creating {output_path}: {e}")
        return False

def main():
    base_dir = Path(__file__).parent.parent
    sample_dir = base_dir / "sample_translation_openai" / "docs_uz"
    output_dir = base_dir / "sample_translation_openai_pdfs"
    
    # Create output directory
    output_dir.mkdir(exist_ok=True)
    
    # Find all MDX files
    mdx_files = list(sample_dir.glob("*/page.mdx"))
    
    if not mdx_files:
        print("No MDX files found!")
        return
    
    print(f"Found {len(mdx_files)} MDX files to convert\n")
    
    # Convert each file
    success_count = 0
    for mdx_file in mdx_files:
        folder_name = mdx_file.parent.name
        output_file = output_dir / f"{folder_name}.pdf"
        
        if convert_mdx_to_pdf(mdx_file, output_file):
            success_count += 1
    
    print(f"\n{'='*60}")
    print(f"Conversion complete: {success_count}/{len(mdx_files)} files successfully converted")
    print(f"PDFs saved to: {output_dir}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
