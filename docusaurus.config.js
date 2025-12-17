const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");

async function createConfig() {
    const katex = (await import("rehype-katex")).default;
    return {
        title: "Learn Prompting: Your Guide to Communicating with AI",
        tagline:
            "A Free, Open Source Course on Communicating with Artificial Intelligence",
        url: "https://learnprompting.uz", // Updated to primary domain
        baseUrl: "/",
        onBrokenLinks: "warn", // Changed to warn to avoid build failures during migration
        onBrokenMarkdownLinks: "warn",
        favicon: "img/favicon.ico",
        organizationName: "humblebeeai", // Updated to new owner
        projectName: "Learn_Prompting",
        deploymentBranch: "gh-pages",
        trailingSlash: false,
        i18n: {
            defaultLocale: "uz",
            locales: [
                "uz",
                "en",
            ],
            localeConfigs: {
                'uz': {
                    label: "O'zbekcha",
                    direction: 'ltr',
                },
                'en': {
                    label: 'English',
                    direction: 'ltr',
                },
            },
        },
        scripts: [
            /*
            {
              src: "https://tag.clearbitscripts.com/v1/pk_5621ff511ea83a6ec015bee0a0b5dd79/tags.js",
              async: true,
            },
            */
        ],
        plugins: [
            [
                "@docusaurus/plugin-client-redirects",
                {
                    redirects: [
                        { to: "/docs/basics/formalizing/page", from: "/docs/basics/standard_prompt" },
                        { to: "/docs/tooling/IDEs/intro/page", from: "/docs/IDEs/intro" },
                        { to: "/our_services", from: "/consulting" },
                    ],
                },
            ],
            async function myPlugin(context, options) {
                return {
                    name: "docusaurus-tailwindcss",
                    configurePostCss(postcssOptions) {
                        postcssOptions.plugins.push(require("tailwindcss"));
                        postcssOptions.plugins.push(require("autoprefixer"));
                        return postcssOptions;
                    },
                };
            },
            // Posthog disabled for now or needs new key
            /*
            ["posthog-docusaurus", {
              apiKey: process.env.POSTHOG_API_KEY || "DEV",
              appUrl: "https://app.posthog.com",
              enableInDevelopment: false,
            }],
            */
        ],

        presets: [
            [
                "classic",
                {
                    /*
                    gtag: { trackingID: "G-FV0C417KS8" },
                    googleAnalytics: { trackingID: "G-FV0C417KS8" },
                    */
                    docs: {
                        admonitions: {
                            tag: ":::",
                            keywords: ["note", "tip", "info", "caution", "danger", "takeaways"],
                        },
                        sidebarPath: require.resolve("./sidebars.js"),
                        // Point to the fork or upstream? For now upstream or local.
                        editUrl: "https://github.com/humblebeeai/Learn_Prompting/tree/main",
                        remarkPlugins: [
                            math,
                            (await import("remark-gfm")).default,
                            /*
                            [
                              (await import("@benchmark-urbanism/remark-bibtex")).default,
                              { bibtexFile: "bibliography.bib" },
                            ],
                            [
                              (await import("@renatonagliati/remark-auto-glossary")).default,
                              { yamlFile: "glossary.yml" },
                            ],
                            */
                        ],
                        rehypePlugins: [[katex, { strict: false }]],
                    },
                    theme: {
                        customCss: require.resolve("./src/css/custom.css"),
                    },
                },
            ],
        ],
        stylesheets: [
            {
                href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
                type: "text/css",
                integrity: "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
                crossorigin: "anonymous",
                defer: true,
            },
            { href: "https://fonts.googleapis.com", rel: "preconnect", async: true },
            { href: "https://fonts.gstatic.com", rel: "preconnect", crossorigin: "", async: true },
            {
                href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap",
                async: true,
            },
        ],
        themeConfig: {
            metadata: [
                { name: "description", content: "Learn Prompting x HumblebeeAI: Free, Open Source Course on Communicating with AI." },
                { name: "keywords", content: "prompting, prompt engineering, learn prompting, AI, chatGPT, humblebeeai, uzbek, russian" },
            ],
            navbar: {
                title: "Learn Prompting",
                logo: {
                    alt: "Learn Prompting Logo",
                    src: "img/simple_ai.webp",
                },
                items: [
                    {
                        type: "doc",
                        docId: "intro/index",
                        position: "left",
                        label: "Docs",
                    },
                    { type: "localeDropdown", position: "right" },
                    {
                        href: "https://github.com/humblebeeai/Learn_Prompting",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            announcementBar: {
                id: "collaboration",
                content: '🇺🇿 🇺🇸 <b>Learn Prompting × <a href="https://humblebee.ai" target="_blank">HumblebeeAI</a></b> Collaboration Edition',
                backgroundColor: "#53ffd4",
                textColor: "#000",
                isCloseable: true,
            },
            footer: {
                style: "dark",
                logo: {
                    alt: 'HumblebeeAI Logo',
                    src: '/humblebee_logo.svg',
                    href: 'https://humblebee.ai',
                    width: 150,
                },
                copyright: `
          <div style="margin-top: 10px;">
            Uzbek/Russian editions maintained by <strong>HumblebeeAI</strong>.<br/>
            Content by <a href="https://learnprompting.org" target="_blank" rel="noopener noreferrer">Learn Prompting</a> contributors.
            Licensed <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>.
          </div>
        `,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        },
        markdown: {
            mermaid: true,
        },
        themes: ["@docusaurus/theme-mermaid"],
    };
}

module.exports = createConfig;
