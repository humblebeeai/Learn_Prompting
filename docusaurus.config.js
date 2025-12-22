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
		favicon: "img/simple_ai.webp",
		organizationName: "humblebeeai", // Updated to new owner
		projectName: "Learn_Prompting",
		deploymentBranch: "gh-pages",
		trailingSlash: false,
		i18n: {
			defaultLocale: "uz",
			locales: ["uz", "en"],
			localeConfigs: {
				uz: {
					label: "O'zbekcha",
					direction: "ltr",
				},
				en: {
					label: "English",
					direction: "ltr",
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
						// { to: "/docs/basics/formalizing/page", from: "/docs/basics/standard_prompt" },
						// { to: "/docs/tooling/IDEs/intro/page", from: "/docs/IDEs/intro" },
						// { to: "/our_services", from: "/consulting" },
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
							keywords: [
								"note",
								"tip",
								"info",
								"caution",
								"danger",
								"takeaways",
							],
						},
						sidebarPath: require.resolve("./sidebars.js"),
						// Point to the fork or upstream? For now upstream or local.
						editUrl: "https://github.com/humblebeeai/Learn_Prompting/tree/main",
						remarkPlugins: [
							math,
							(await import("remark-gfm")).default,

							[
								(await import("@benchmark-urbanism/remark-bibtex")).default,
								{ bibtexFile: "bibliography.bib" },
							],
							[
								(await import("@renatonagliati/remark-auto-glossary")).default,
								{ yamlFile: "glossary.yml" },
							],
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
				integrity:
					"sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
				crossorigin: "anonymous",
				defer: true,
			},
			{ href: "https://fonts.googleapis.com", rel: "preconnect", async: true },
			{
				href: "https://fonts.gstatic.com",
				rel: "preconnect",
				crossorigin: "",
				async: true,
			},
			{
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap",
				async: true,
			},
		],
		themeConfig: {
			colorMode: {
				defaultMode: 'light',
				disableSwitch: false,
				respectPrefersColorScheme: true,
			},
			metadata: [
				{
					name: "description",
					content:
						"Learn Prompting x HumblebeeAI: Free, Open Source Course on Communicating with AI.",
				},
				{
					name: "keywords",
					content:
						"prompting, prompt engineering, learn prompting, AI, chatGPT, humblebeeai, uzbek",
				},
			],
			navbar: {
				title: "Learn Prompting",
				logo: {
					alt: "Learn Prompting Logo",
					src: "img/simple_ai.webp",
				},
				items: [
					{
						type: "html",
						position: "left",
						value:
							'<div style="display: flex; align-items: center; margin-left: -27px"><span style="margin: 0 14px; color: var(--ifm-color-primary); font-weight: 800; font-size: 1.5rem;">×</span><a href="/" style="display: flex; align-items: center; text-decoration: none; color: inherit;"><img src="https://academy.humblebee.ai/images/logo/logo.svg" alt="HumblebeeAI" class="logo-glow" style="height: 32px; margin-right: 12px;" /><span style="font-weight: 700; font-size: 18px; letter-spacing: -0.02em;">HumblebeeAI</span></a></div>',
					},
					{
						to: "/about-project",
						label: "Loyiha haqida",
						position: "right",
					},
					{
						type: "dropdown",
						label: "Tillar",
						position: "right",
						className: "icon-link-language",
						items: [
							{
								label: "O'zbekcha",
								href: "/",
								target: "_self",
							},
							{
								label: "English (Coming Soon)",
								href: "/coming-soon",
								target: "_self",
							},
						],
					},
					{
						href: "https://academy.humblebee.ai",
						label: "Academy",
						position: "right",
						className: "navbar-academy-link",
					},

					{
						to: "/docs/intro",
						label: "Kursga kirish",
						position: "right",
						className: "navbar-docs-button",
					},
				],
			},
			announcementBar: {
				id: "collaboration",
				content:
					'<div style="font-weight: 600; font-size: 15px;">🇺🇿 <span style="margin: 0 8px;">Learn Prompting × HumblebeeAI Collaboration Edition</span> 🇺🇸</div>',
				backgroundColor: "#53ffd4",
				textColor: "#000",
				isCloseable: true,
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "Navigation",
						items: [
							{
								label: "Dokumentatsiya",
								to: "/docs/intro",
							},
							{
								label: "Loyiha haqida",
								to: "/about-project",
							},
						],
					},
					{
						title: "Community",
						items: [
							{
								label: "GitHub",
								href: "https://github.com/humblebeeai/Learn_Prompting",
							},
							{
								label: "HumblebeeAI",
								href: "https://humblebee.ai",
							},
						],
					},
					{
						title: "More",
						items: [
							{
								label: "Learn Prompting (English)",
								href: "https://learnprompting.org",
							},
							{
								label: "License",
								href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
							},
						],
					},
				],
				copyright: `
          <div style="margin-top: 10px;">
            Uzbek editions maintained by <strong>HumblebeeAI</strong>.<br/>
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
