import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
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
  const { i18n } = useDocusaurusContext();
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
          <span className="title-line"><Translate id="homepage.hero.title.line1">Sun'iy intellekt bilan</Translate></span>
          <span className="title-line title-accent"><Translate id="homepage.hero.title.line2">samarali ishlashni</Translate></span>
          <span className="title-line"><Translate id="homepage.hero.title.line3">o'rganing</Translate></span>
        </h1>

        <p className={`hero-subtitle ${isLoaded ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
          <Translate id="homepage.hero.subtitle">ChatGPT, Claude va boshqa AI vositalari bilan professional darajada ishlash ko'nikmalarini egallang. Bepul, ochiq manbali qo'llanma.</Translate>
        </p>

        <div className={`hero-actions ${isLoaded ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
          <Link
            className="btn-primary"
            to="/docs/intro">
            <span><Translate id="homepage.hero.button.start">Boshlash</Translate></span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className={`hero-stats ${isLoaded ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
          <StatItem value="3M+" label={<Translate id="homepage.stats.learners">O'quvchilar</Translate>} />
          <div className="stat-divider" />
          <StatItem value="60+" label={<Translate id="homepage.stats.modules">Modullar</Translate>} />
          <div className="stat-divider" />
          <StatItem value="100%" label={<Translate id="homepage.stats.free">Bepul</Translate>} />
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// Features Section
function FeaturesSection() {
  const [ref, isInView] = useInView(0.1);
  
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: <Translate id="homepage.features.stepbystep.title">Bosqichma-bosqich o'rganish</Translate>,
      description: <Translate id="homepage.features.stepbystep.description">Oddiy tushunchalardan murakkab texnikalargacha tizimli ravishda o'rganing</Translate>
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: <Translate id="homepage.features.practice.title">Amaliy mashqlar</Translate>,
      description: <Translate id="homepage.features.practice.description">Har bir darsda real vazifalar va interaktiv mashqlar bilan mustahkamlang</Translate>
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      title: <Translate id="homepage.features.community.title">Hamjamiyat</Translate>,
      description: <Translate id="homepage.features.community.description">O'zbek tilidagi AI ishqibozlari hamjamiyatiga qo'shiling</Translate>
    }
  ];

  return (
    <section ref={ref} className="features-section">
      <div className="section-container">
        <div className={`section-header ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}>
          <span className="section-label"><Translate id="homepage.features.label">Nimalarni o'rganasiz</Translate></span>
          <h2 className="section-title"><Translate id="homepage.features.mainTitle">AI bilan muloqot san'ati</Translate></h2>
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
      title: <Translate id="homepage.path.step1.title">AI asoslari</Translate>,
      description: <Translate id="homepage.path.step1.description">Sun'iy intellekt qanday ishlashini tushuning</Translate>,
      color: "#10b981"
    },
    {
      number: "02", 
      title: <Translate id="homepage.path.step2.title">Prompt yozish</Translate>,
      description: <Translate id="homepage.path.step2.description">Samarali so'rovlar tuzishni o'rganing</Translate>,
      color: "#06b6d4"
    },
    {
      number: "03",
      title: <Translate id="homepage.path.step3.title">Ilg'or texnikalar</Translate>,
      description: <Translate id="homepage.path.step3.description">Professional usullarni egallang</Translate>,
      color: "#8b5cf6"
    },
    {
      number: "04",
      title: <Translate id="homepage.path.step4.title">Amaliy qo'llash</Translate>,
      description: <Translate id="homepage.path.step4.description">Real loyihalarda foydalaning</Translate>,
      color: "#f59e0b"
    }
  ];

  return (
    <section ref={ref} className="path-section">
      <div className="section-container">
        <div className={`section-header ${isInView ? 'animate-slide-up' : 'init-slide-up'}`}>
          <span className="section-label"><Translate id="homepage.path.label">O'quv yo'li</Translate></span>
          <h2 className="section-title"><Translate id="homepage.path.mainTitle">4 bosqichda professional darajaga yeting</Translate></h2>
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
            <Translate id="homepage.cta.description">3 million dan ortiq o'quvchilarga qo'shiling va AI bilan ishlash mahoratini egallang</Translate>
          </p>
          <div className="cta-actions">
            <Link className="btn-primary btn-lg" to="/docs/intro">
              <span><Translate id="homepage.cta.button">Kursni boshlash</Translate></span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        <div className="collab-badge"><Translate id="homepage.collab.badge">Hamkorlik</Translate></div>
        <p className="collab-text">
          <Translate id="homepage.collab.text" values={{
            humblebee: <strong><a href="https://humblebee.ai" target="_blank">HumblebeeAI</a></strong>,
            learnprompting: <strong>Learn Prompting</strong>
          }}>
            {"O'zbek va rus tillaridagi tarjima versiyalari {humblebee} tomonidan yuritiladi. Asl kontent {learnprompting} ochiq manbali hamjamiyati tomonidan yaratilgan."}
          </Translate>
        </p>
        <Link className="collab-link" to="/about-collaboration">
          <Translate id="homepage.collab.link">Hamkorlik haqida batafsil</Translate>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
      title={translate({id: 'homepage.meta.title', message: 'AI Bilan Muloqot'})}
      description={translate({id: 'homepage.meta.description', message: 'Learn Prompting × HumblebeeAI Hamkorligi'})}>
      <main className="homepage">
        <HomepageHero />
        <FeaturesSection />
        <LearningPathSection />
        <CTASection />
        <CollaborationSection />
      </main>
    </Layout>
  );
}
