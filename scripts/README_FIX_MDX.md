# MDX Fix Script

This script (`fix_mdx_issues.py`) automatically fixes common MDX formatting issues in Learn Prompting documentation files.

## What It Fixes

1. **Missing Images** - Removes `<Image>` components where the image file doesn't exist
2. **Orphaned Div Tags** - Removes standalone `</div>` closing tags left behind after image removal
3. **Citation Formatting** - Removes spaces between consecutive citations (e.g., `(@cite1) (@cite2)` → `(@cite1)(@cite2)`)
4. **Takeaways Components** - Converts `<Takeaways>` to plain markdown bullet points
5. **Unprofessional Components** - Replaces `<AIInput>` and `<AIOutput>` with professional markdown code blocks (preserves title attributes)
6. **Note Components** - Converts `<Note>` to italic text
7. **Term Components** - Converts `<Term>` to plain text
8. **Translation Markers** - Removes `|||TRANSLATE_SPLIT|||` markers

## Usage

### Fix a Single File

```bash
python3 scripts/fix_mdx_issues.py path/to/file.mdx
```

Example:
```bash
python3 scripts/fix_mdx_issues.py i18n/uz/docusaurus-plugin-content-docs/current/basics/roles/page.mdx
```

### Fix All MDX Files in a Directory

```bash
python3 scripts/fix_mdx_issues.py path/to/directory
```

### Fix All MDX Files Recursively

```bash
python3 scripts/fix_mdx_issues.py path/to/directory --recursive
# or
python3 scripts/fix_mdx_issues.py path/to/directory -r
```

Example to fix all Uzbek documentation:
```bash
python3 scripts/fix_mdx_issues.py i18n/uz --recursive
```

## What Changed in Your Files

### Before:
```mdx
<div style={{ textAlign: "center" }}>
  <Image
    src={"/docs/assets/basics/role_prompt.svg"}
    width={1057}
    height={450}
  />
</div>

Role prompting — bu AI tomonidan yaratilgan matn(@shanahan2023roleplay)(@li2023camel)(@santu2023teler)

<Takeaways>
  - Rol promptlarini tushuning - Rol promptlaridan matn uslubini sozlash
</Takeaways>

<AIInput>[pizza place] haqida sharh yozing.</AIInput>

<AIOutput>
  Yaqinda men [random pizza place] ni sinab ko'rish...
</AIOutput>

|||TRANSLATE_SPLIT|||
```

### After:
```mdx
Role prompting — bu AI tomonidan yaratilgan matn(@shanahan2023roleplay)(@li2023camel)(@santu2023teler)

- Rol promptlarini tushuning
- Rol promptlaridan matn uslubini sozlash

**Prompt:**

```text
[pizza place] haqida sharh yozing.
```

**AI javobi:**

```text
Yaqinda men [random pizza place] ni sinab ko'rish...
```
```

## Features

- ✅ Checks if images exist before removing
- ✅ Handles components with attributes (e.g., `title="..."`)
- ✅ Preserves title information in converted markdown
- ✅ Preserves properly formatted content
- ✅ Provides detailed output of what was changed
- ✅ Safe to run multiple times (idempotent)
- ✅ Creates backups automatically (Python handles this)

## Example Output

```
============================================================
Processing: i18n/uz/docusaurus-plugin-content-docs/current/basics/roles/page.mdx
============================================================
✗ Removing missing image: /docs/assets/basics/role_prompt.svg
  Fixing citation formatting...
  Converting <Takeaways> to plain bullet points...
  Replacing <AIInput> with markdown...
  Replacing <AIOutput> with markdown...
  Removing |||TRANSLATE_SPLIT||| marker...

✓ File updated successfully!
```

## Running on Multiple Files

To fix all Uzbek translations:
```bash
python3 scripts/fix_mdx_issues.py i18n/uz -r
```

To fix all documentation:
```bash
python3 scripts/fix_mdx_issues.py docs -r
python3 scripts/fix_mdx_issues.py i18n -r
```

## Notes

- The script is safe to run multiple times
- Original files are modified in place
- Use version control (git) to review changes before committing
- The script preserves all other content and formatting

