# Learn Prompting × HumblebeeAI

This repository contains the localized edition of [Learn Prompting](https://learnprompting.org), managed in collaboration with **[HumblebeeAI](https://humblebee.ai)** to bring high-quality AI education to Central Asia.

## 🌍 Languages
- **O'zbek** (Default): `/` (`docs/`)
- **English**: `/en/` (`i18n/en`)

## 🚀 Quick Start

### Option 1: Docker (Recommended)
You can run the entire website locally using Docker. This ensures you have the exact same environment as production.

```bash
docker-compose up --build
```
The site will be available at `http://localhost:3000`.

### Option 2: Local Node.js
Requirements: Node.js (v18+).

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run start
   ```

3. **Build specific locale (e.g., English):**
   ```bash
   npm run build -- --locale en
   ```

## 🤝 Collaboration Guidelines

### Translation Workflow
1. **Sync**: Run `./scripts/manage_i18n.sh sync` to identify changed files.
2. **Translate**: Edit files in `docs/` (Uzbek) or `i18n/en` (English).
3. **Verify**: Run `npm run start` and switch languages to check your changes.

### Contributing
- Please ensure all Markdown frontmatter is valid.
- `docs/` contains the **Uzbek** source content.
- `i18n/en/` contains the **English** content.

## ❤️ Attribution
- **Original Content**: [Learn Prompting](https://github.com/trigaten/Learn_Prompting) (Apache 2.0 / CC BY-NC-SA 4.0).
- **Localization**: HumblebeeAI Academy.
