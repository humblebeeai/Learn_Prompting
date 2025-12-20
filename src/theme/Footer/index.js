import React from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './styles.css';

export default function Footer() {
	const { siteConfig } = useDocusaurusContext();
	const { footer } = siteConfig.themeConfig;

	if (!footer) {
		return null;
	}

	const socialLinks = [
		{
			name: 'Discord',
			href: 'https://discord.gg/learn-prompting-1046228027434086460',
			icon: (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
				</svg>
			)
		},
		{
			name: 'GitHub',
			href: 'https://github.com/humblebeeai/Learn_Prompting',
			icon: (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
				</svg>
			)
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com/learnprompting',
			icon: (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
				</svg>
			)
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/company/learn-prompting',
			icon: (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
				</svg>
			)
		}
	];

	const quickLinks = [
		{ label: <Translate id="footer.quickLinks.docs">Docs</Translate>, to: '/docs/intro' },
		{ label: <Translate id="footer.quickLinks.collaboration">Hamkorlik</Translate>, to: '/about-collaboration' },
		{ label: <Translate id="footer.quickLinks.academy">AI Akademiya</Translate>, href: 'https://academy.humblebee.ai' }
	];

	const legalLinks = [
		{ label: <Translate id="footer.legalLinks.privacy">Maxfiylik siyosati</Translate>, href: 'https://learnprompting.org/privacy_policy' },
		{ label: <Translate id="footer.legalLinks.terms">Foydalanish shartlari</Translate>, href: 'https://learnprompting.org/terms_of_service' },
		{ label: <Translate id="footer.legalLinks.license">Litsenziya</Translate>, href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' }
	];

	return (
		<footer className="modern-footer">
			<div className="footer-container">
				{/* Top Section */}
				<div className="footer-top">
					<div className="footer-brand">
						{footer.logo && (
							<Link href={footer.logo.href} className="footer-logo">
								<img
									src={footer.logo.src}
									alt={footer.logo.alt}
									width={footer.logo.width || 120}
								/>
							</Link>
						)}
						<p className="footer-tagline">
							<Translate id="footer.tagline">Sun'iy intellekt bilan professional darajada ishlashni o'rganing</Translate>
						</p>
					</div>

					<div className="footer-links-grid">
						<div className="footer-links-column">
							<h4 className="footer-column-title"><Translate id="footer.column.quickLinks">Tezkor havolalar</Translate></h4>
							<ul className="footer-links-list">
								{quickLinks.map((link, index) => (
									<li key={index}>
										{link.to ? (
											<Link to={link.to} className="footer-link">
												{link.label}
											</Link>
										) : (
											<a href={link.href} className="footer-link" target="_blank" rel="noopener noreferrer">
												{link.label}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>

						<div className="footer-links-column">
							<h4 className="footer-column-title"><Translate id="footer.column.contact">Aloqa</Translate></h4>
							<ul className="footer-links-list">
								<li>
									<a href="https://learnprompting.org" className="footer-link" target="_blank" rel="noopener noreferrer">
										Learn_Prompting
									</a>
								</li>
								<li>
									<a href="https://humblebee.ai" className="footer-link" target="_blank" rel="noopener noreferrer">
										HumblebeeAI
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="footer-divider" />

				{/* Bottom Section */}
				<div className="footer-bottom">
					<div className="footer-copyright">
						<span><Translate id="footer.copyright" values={{
							year: new Date().getFullYear(),
							humblebee: <a href="https://humblebee.ai" target="_blank">HumblebeeAI</a>
						}}>{"© {year} Learn Prompting × {humblebee}"}</Translate></span>
						<div className="footer-legal-links">
							{legalLinks.map((link, index) => (
								<React.Fragment key={index}>
									<a
										href={link.href}
										className="footer-legal-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										{link.label}
									</a>
									{index < legalLinks.length - 1 && <span className="legal-separator">·</span>}
								</React.Fragment>
							))}
						</div>
					</div>

					<div className="footer-social">
						{socialLinks.map((social, index) => (
							<a
								key={index}
								href={social.href}
								className="footer-social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.name}
								title={social.name}
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>

				{/* Attribution */}
				<div className="footer-attribution">
					<p>
						<Translate id="footer.attribution" values={{
							humblebee: <strong><a href="https://humblebee.ai" target="_blank">HumblebeeAI</a></strong>,
							learnprompting: <a href="https://learnprompting.org" target="_blank" rel="noopener noreferrer">Learn Prompting</a>
						}}>
							{"O'zbek nashri {humblebee} tomonidan yuritiladi. Kontent {learnprompting} ishtirokchilari tomonidan yaratilgan."}
						</Translate>
					</p>
				</div>
			</div>
		</footer>
	);
}
