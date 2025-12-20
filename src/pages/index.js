import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import './index.css';

// Intersection Observer Hook for scroll animations
function useInView(threshold = 0.1) {
	const ref = useRef(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold]);

	return [ref, isInView];
}

// Hero Section with premium design
function HomepageHero() {
	const { siteConfig } = useDocusaurusContext();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<section className="hero-section">
			<div className="hero-background">
				<div className="hero-gradient-orb hero-orb-1" />
				<div className="hero-gradient-orb hero-orb-2" />
				<div className="hero-grid" />
			</div>

			<div className="hero-content">
				<div className={`hero-badge ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
					<span className="badge-dot" />
					<span><a href="https://humblebee.ai" target="_blank">HumblebeeAI</a> × Learn Prompting</span>
				</div>

				<h1 className={`hero-title ${isLoaded ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
					<span className="title-line"><Translate id="homepage.hero.title.line1">AI bilan samarali muloqot qiling.</Translate></span>
					<span className="title-line title-accent"><Translate id="homepage.hero.title.line2">Professional darajaga chiqing.</Translate></span>
				</h1>

				<p className={`hero-subtitle ${isLoaded ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
					<Translate id="homepage.hero.subtitle">ChatGPT, Claude va boshqa sun’iy intellekt vositalaridan ish, ta’lim va biznesda to‘g‘ri va samarali foydalanishni o‘rganing. 100% bepul, ochiq manbali, real ko‘nikmalarga yo‘naltirilgan kurs.</Translate>
				</p>

				<div className={`hero-actions ${isLoaded ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
					<Link
						className="btn-primary"
						to="/docs/intro">
						<span><Translate id="homepage.hero.button.start">Kursni boshlash</Translate></span>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Link>
					<Link
						className="btn-secondary"
						to="/docs/basics/intro">
						<span><Translate id="homepage.hero.button.modules">Modullar ro‘yxati</Translate></span>
					</Link>
				</div>

				<div className={`hero-stats ${isLoaded ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
					<StatItem value="3M+" label={<Translate id="homepage.stats.learners">o‘rganuvchi</Translate>} />
					<div className="stat-divider" />
					<StatItem value="60+" label={<Translate id="homepage.stats.modules">modul</Translate>} />
					<div className="stat-divider" />
					<StatItem value="" label={<Translate id="homepage.stats.free">100% bepul</Translate>} />
				</div>

				<p className={`hero-trust-text ${isLoaded ? 'animate-fade-in-up stagger-5' : 'opacity-0'}`}>
					<Translate id="homepage.hero.trust">O‘zbek tilida tarjima va lokalizatsiya — hamjamiyat bilan birga.</Translate>
				</p>
			</div>
		</section>
	);
}

function StatItem({ value, label }) {
	return (
		<div className="stat-item">
			{value && <span className="stat-value">{value}</span>}
			<span className="stat-label">{label}</span>
		</div>
	);
}

// Audience Section
function AudienceSection() {
	const [ref, isInView] = useInView(0.1);

	const audience = [
		{ label: <Translate id="homepage.audience.students">Talabalar</Translate>, icon: "🎓" },
		{ label: <Translate id="homepage.audience.teachers">O‘qituvchilar</Translate>, icon: "🍎" },
		{ label: <Translate id="homepage.audience.entrepreneurs">Tadbirkorlar va mutaxassislar</Translate>, icon: "💼" },
		{ label: <Translate id="homepage.audience.civilservants">Davlat va ofis xodimlari</Translate>, icon: "🏛️" },
	];

	return (
		<section ref={ref} className="audience-section">
			<div className={`section-container ${isInView ? 'animate-fade-in' : 'init-fade-in'}`}>
				<div className="audience-grid">
					{audience.map((item, index) => (
						<div key={index} className="audience-card">
							<div className="audience-icon">{item.icon}</div>
							<div className="audience-label">{item.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}


// Features Section
function FeaturesSection() {
	const [ref, isInView] = useInView(0.1);

	const features = [
		{
			icon: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
					<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
				</svg>
			),
			title: <Translate id="homepage.features.stepbystep.title">Aniq prompt yozish</Translate>,
			description: <Translate id="homepage.features.stepbystep.description">Natija beradigan savollar, topshiriqlar va instruktsiyalar tuzish</Translate>
		},
		{
			icon: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
					<line x1="3" y1="9" x2="21" y2="9" />
					<line x1="9" y1="21" x2="9" y2="9" />
				</svg>
			),
			title: <Translate id="homepage.features.practice.title">Ish uchun tayyor shablonlar</Translate>,
			description: <Translate id="homepage.features.practice.description">Email, reja, hisobot, prezentatsiya va tahlil promptlari</Translate>
		},
		{
			icon: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
				</svg>
			),
			title: <Translate id="homepage.features.community.title">Amaliy mashqlar</Translate>,
			description: <Translate id="homepage.features.community.description">Har bir modulda real hayotdan olingan vazifalar</Translate>
		},
		{
			icon: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				</svg>
			),
			title: <Translate id="homepage.features.responsible.title">Mas’uliyatli AI’dan foydalanish</Translate>,
			description: <Translate id="homepage.features.responsible.description">Xatolarni aniqlash, tekshirish, ishonchlilik va xavfsizlik</Translate>
		},
		{/* Removed extra comma or items if any */ }
	];

	return (
		<section ref={ref} className="features-section">
			<div className="section-container">
				<div className={`section-header ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}>
					<span className="section-label"><Translate id="homepage.features.label">Siz oladigan ko‘nikmalar</Translate></span>
					<h2 className="section-title"><Translate id="homepage.features.mainTitle">AI bilan muloqot san’ati</Translate></h2>
				</div>

				<div className="features-grid">
					{features.map((feature, index) => (
						<div
							key={index}
							className={`feature-card ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}
							style={{ animationDelay: `${0.1 + index * 0.1}s` }}
						>
							<div className="feature-icon">{feature.icon}</div>
							<h3 className="feature-title">{feature.title}</h3>
							<p className="feature-description">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// Learning Path Section
function LearningPathSection() {
	const [ref, isInView] = useInView(0.1);

	const steps = [
		{
			number: "01",
			title: <Translate id="homepage.path.step1.title">AI va prompt asoslari</Translate>,
			description: <Translate id="homepage.path.step1.description">Sun’iy intellekt qanday ishlaydi, LLM’lar nimaga qodir va tamoyillar</Translate>,
			color: "#10b981"
		},
		{
			number: "02",
			title: <Translate id="homepage.path.step2.title">Amaliy qo‘llanmalar</Translate>,
			description: <Translate id="homepage.path.step2.description">AI’dan kundalik ishda foydalanish: email, hujjat, reja</Translate>,
			color: "#06b6d4"
		},
		{
			number: "03",
			title: <Translate id="homepage.path.step3.title">Intermediate va Advanced</Translate>,
			description: <Translate id="homepage.path.step3.description">Instruction prompting, few-shot, multi-step va murakkab vazifalar</Translate>,
			color: "#8b5cf6"
		},
		{
			number: "04",
			title: <Translate id="homepage.path.step4.title">Kengaytirilgan mavzular</Translate>,
			description: <Translate id="homepage.path.step4.description">Ishonchlilik, tekshiruv, image prompting va tooling</Translate>,
			color: "#f59e0b"
		}
	];

	return (
		<section ref={ref} className="path-section">
			<div className="section-container">
				<div className={`section-header ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}>
					<span className="section-label"><Translate id="homepage.path.label">O‘rganish yo‘li</Translate></span>
					<h2 className="section-title"><Translate id="homepage.path.mainTitle">Qadamma-qadam real ko‘nikmaga</Translate></h2>
				</div>

				<div className="path-grid">
					{steps.map((step, index) => (
						<div
							key={index}
							className={`path-card ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}
							style={{ animationDelay: `${0.1 + index * 0.1}s` }}
						>
							<div className="path-number" style={{ color: step.color }}>
								{step.number}
							</div>
							<h3 className="path-title">{step.title}</h3>
							<p className="path-description">{step.description}</p>
							<div className="path-line" style={{ background: step.color }} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// CTA Section
function CTASection() {
	const [ref, isInView] = useInView(0.1);

	return (
		<section ref={ref} className="cta-section">
			<div className="cta-container">
				<div className={`cta-content ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}>
					<h2 className="cta-title"><Translate id="homepage.cta.title">Bugun boshlang</Translate></h2>
					<p className="cta-description">
						<Translate id="homepage.cta.description">Bu kursni millionlab o‘rganuvchilar real ishlarida qo‘llamoqda. Siz ham bugun boshlang va birinchi amaliy natijani qisqa vaqt ichida ko‘ring.</Translate>
					</p>
					<div className="cta-actions">
						<Link className="btn-primary btn-lg" to="/docs/intro">
							<span><Translate id="homepage.cta.button">Kursni boshlash</Translate></span>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</Link>
					</div>
				</div>
				<div className="cta-decoration">
					<div className="cta-circle cta-circle-1" />
					<div className="cta-circle cta-circle-2" />
				</div>
			</div>
		</section>
	);
}

// Collaboration Section
function CollaborationSection() {
	const [ref, isInView] = useInView(0.1);

	return (
		<section ref={ref} className="collab-section">
			<div className={`collab-content ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}>
				<div className="collab-badge"><Translate id="homepage.collab.badge">Hamkorlik va ochiqlik</Translate></div>

				<div className="collab-details">
					<ul className="collab-list" style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
						<li>✨ <Translate id="homepage.collab.content">Kontent: Learn Prompting open-source hamjamiyati</Translate></li>
						<li>🇺🇿 <Translate id="homepage.collab.translation">Tarjima va lokalizatsiya: HumblebeeAI</Translate></li>
						<li>🔓 <Translate id="homepage.collab.license">Manba va litsenziya: GitHub’da ochiq</Translate></li>
					</ul>
				</div>


				<p className="collab-text">
					<Translate id="homepage.collab.text" values={{
						humblebee: <strong><a href="https://humblebee.ai" target="_blank">HumblebeeAI</a></strong>,
						learnprompting: <strong>Learn Prompting</strong>
					}}>
						{"O'zbek versiyasi {humblebee} tomonidan yuritiladi. Kontent {learnprompting} ochiq manbali hamjamiyati tomonidan yaratilgan."}
					</Translate>
				</p>

				<Link className="collab-link" to="/about-collaboration">
					<Translate id="homepage.collab.link">Hamkorlik haqida batafsil</Translate>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Link>
			</div>
		</section>
	);
}

// Main Home Component
export default function Home() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Layout
			title={translate({ id: 'homepage.meta.title', message: 'AI Bilan Muloqot' })}
			description={translate({ id: 'homepage.meta.description', message: 'Learn Prompting × HumblebeeAI Hamkorligi' })}>
			<main className="homepage">
				<HomepageHero />
				<AudienceSection />
				<FeaturesSection />
				<LearningPathSection />
				<CTASection />
				<CollaborationSection />
			</main>
		</Layout>
	);
}
