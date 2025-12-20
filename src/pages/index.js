import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import "./index.css";

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
        <div
          className={`hero-badge ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
        >
          <span className="badge-dot" />
          <span>
            <a href="https://humblebee.ai" target="_blank">
              HumblebeeAI
            </a>{" "}
            × Learn Prompting
          </span>
        </div>

        <h1
          className={`hero-title ${
            isLoaded ? "animate-fade-in-up stagger-1" : "opacity-0"
          }`}
        >
          <span className="title-line">
            <Translate id="homepage.hero.title.line1">AI bilan.</Translate>
          </span>
          <span className="title-line title-accent">
            <Translate id="homepage.hero.title.line2">
              Professional darajada
            </Translate>
          </span>
          <span className="title-line">
            <Translate id="homepage.hero.title.line3">
              ishlashni o'rganing.
            </Translate>
          </span>
        </h1>

        <p
          className={`hero-subtitle ${
            isLoaded ? "animate-fade-in-up stagger-2" : "opacity-0"
          }`}
        >
          <Translate id="homepage.hero.subtitle">
            ChatGPT, Claude va boshqa sun'iy intellekt vositalaridan ish, ta'lim
            va biznesda to'g'ri va samarali foydalanishni o'rganing. 100% bepul,
            ochiq manbali, real ko'nikmalarga yo'naltirilgan kurs.
          </Translate>
        </p>

        <div
          className={`hero-actions ${
            isLoaded ? "animate-fade-in-up stagger-3" : "opacity-0"
          }`}
        >
          <Link className="btn-primary" to="/docs/intro">
            <span>
              <Translate id="homepage.hero.button.start">
                Kursni boshlash
              </Translate>
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L8 3M13 8L8 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div
          className={`hero-stats ${
            isLoaded ? "animate-fade-in-up stagger-4" : "opacity-0"
          }`}
        >
          <StatItem
            value="3M+"
            label={
              <Translate id="homepage.stats.learners">o'rganuvchi</Translate>
            }
          />
          <div className="stat-divider" />
          <StatItem
            value="60+"
            label={<Translate id="homepage.stats.modules">modul</Translate>}
          />
          <div className="stat-divider" />
          <StatItem
            value="100%"
            label={<Translate id="homepage.stats.free">bepul</Translate>}
          />
        </div>

        <p
          className={`hero-trust-text ${
            isLoaded ? "animate-fade-in-up stagger-5" : "opacity-0"
          }`}
        ></p>
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
    {
      label: <Translate id="homepage.audience.students">Talabalar</Translate>,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      label: (
        <Translate id="homepage.audience.teachers">O'qituvchilar</Translate>
      ),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: (
        <Translate id="homepage.audience.entrepreneurs">
          Tadbirkorlar va mutaxassislar
        </Translate>
      ),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      label: (
        <Translate id="homepage.audience.civilservants">
          Davlat va ofis xodimlari
        </Translate>
      ),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="audience-section">
      <div
        className={`section-container ${
          isInView ? "animate-fade-in" : "init-fade-in"
        }`}
      >
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
        <img src={require("@site/static/img/chat.webp").default} alt="Chat" />
      ),
      title: (
        <Translate id="homepage.features.stepbystep.title">
          Aniq prompt yozish
        </Translate>
      ),
      description: (
        <Translate id="homepage.features.stepbystep.description">
          Natija beradigan savollar, topshiriqlar va instruktsiyalar tuzish
        </Translate>
      ),
      accentColor: "#10b981",
    },
    {
      icon: (
        <img src={require("@site/static/img/docs.webp").default} alt="Chat" />
      ),
      title: (
        <Translate id="homepage.features.practice.title">
          Ish uchun tayyor shablonlar
        </Translate>
      ),
      description: (
        <Translate id="homepage.features.practice.description">
          Email, reja, hisobot, prezentatsiya va tahlil promptlari
        </Translate>
      ),
      accentColor: "#06b6d4",
    },
    {
      icon: (
        <img src={require("@site/static/img/tasks.webp").default} alt="Chat" />
      ),
      title: (
        <Translate id="homepage.features.community.title">
          Amaliy mashqlar
        </Translate>
      ),
      description: (
        <Translate id="homepage.features.community.description">
          Har bir modulda real hayotdan olingan vazifalar
        </Translate>
      ),
      accentColor: "#8b5cf6",
    },
    {
      icon: (
        <img
          src={require("@site/static/img/responsible.webp").default}
          alt="Chat"
        />
      ),
      title: (
        <Translate id="homepage.features.responsible.title">
          Mas'uliyatli AI'dan foydalanish
        </Translate>
      ),
      description: (
        <Translate id="homepage.features.responsible.description">
          Xatolarni aniqlash, tekshirish, ishonchlilik va xavfsizlik
        </Translate>
      ),
      accentColor: "#f59e0b",
    },
  ];

  return (
    <section ref={ref} className="features-section">
      <div className="section-container">
        <div
          className={`section-header ${
            isInView ? "animate-slide-up" : "init-slide-up"
          }`}
        >
          <span className="section-label">
            <Translate id="homepage.features.label">
              Nimalarni o'rganasiz?
            </Translate>
          </span>
          <h2 className="section-title">
            <Translate id="homepage.features.mainTitle">
              AI bilan muloqot san'ati
            </Translate>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                isInView ? "animate-slide-up" : "init-slide-up"
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="feature-visual">
                <div className="feature-icon-wrapper">{feature.icon}</div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
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
      title: (
        <Translate id="homepage.path.step1.title">
          AI va prompt asoslari
        </Translate>
      ),
      description: (
        <Translate id="homepage.path.step1.description">
          Sun'iy intellekt qanday ishlaydi, LLM'lar nimaga qodir va tamoyillar
        </Translate>
      ),
      color: "#10b981",
    },
    {
      number: "02",
      title: (
        <Translate id="homepage.path.step2.title">
          Amaliy qo'llanmalar
        </Translate>
      ),
      description: (
        <Translate id="homepage.path.step2.description">
          AI'dan kundalik ishda foydalanish: email, hujjat, reja
        </Translate>
      ),
      color: "#06b6d4",
    },
    {
      number: "03",
      title: (
        <Translate id="homepage.path.step3.title">
          O'rta va Yuqori daraja
        </Translate>
      ),
      description: (
        <Translate id="homepage.path.step3.description">
          Instruction prompting, few-shot, multi-step va murakkab vazifalar
        </Translate>
      ),
      color: "#8b5cf6",
    },
    {
      number: "04",
      title: (
        <Translate id="homepage.path.step4.title">
          Kengaytirilgan mavzular
        </Translate>
      ),
      description: (
        <Translate id="homepage.path.step4.description">
          Ishonchlilik, tekshiruv, image prompting va tooling
        </Translate>
      ),
      color: "#f59e0b",
    },
  ];

  return (
    <section ref={ref} className="path-section">
      <div className="section-container">
        <div
          className={`section-header ${
            isInView ? "animate-slide-up" : "init-slide-up"
          }`}
        >
          <span className="section-label">
            <Translate id="homepage.path.label">O'rganish yo'li</Translate>
          </span>
          <h2 className="section-title">
            <Translate id="homepage.path.mainTitle">
              Qadamma-qadam real ko'nikmaga
            </Translate>
          </h2>
        </div>

        <div className="path-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`path-card ${
                isInView ? "animate-slide-up" : "init-slide-up"
              }`}
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
        <div
          className={`cta-content ${
            isInView ? "animate-slide-up" : "init-slide-up"
          }`}
        >
          <h2 className="cta-title">
            <Translate id="homepage.cta.title">Bugun boshlang</Translate>
          </h2>
          <p className="cta-description">
            <Translate id="homepage.cta.description">
              Bu kursni millionlab o'rganuvchilar real ishlarida qo'llamoqda.
              Siz ham bugun boshlang va birinchi amaliy natijani qisqa vaqt
              ichida ko'ring.
            </Translate>
          </p>
          <div className="cta-actions">
            <Link className="btn-primary btn-lg" to="/docs/intro">
              <span>
                <Translate id="homepage.cta.button">Kursni boshlash</Translate>
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10H16M16 10L10 4M16 10L10 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
      <div className="section-container">
        <div
          className={`collab-header ${
            isInView ? "animate-slide-up" : "init-slide-up"
          }`}
        >
          <span className="collab-badge">
            <Translate id="homepage.collab.badge">
              Hamkorlik va ochiqlik
            </Translate>
          </span>
          <h2 className="collab-title">
            <Translate id="homepage.collab.maintitle">
              Ochiq hamkorlik asosida
            </Translate>
          </h2>
        </div>

        <div className="collab-diagram">
          {/* Left Partner - Learn Prompting */}
          <div
            className={`collab-partner collab-partner-left ${
              isInView ? "animate-slide-up" : "init-slide-up"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="partner-card">
              <div className="partner-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="partner-name">Learn Prompting</h3>
              <p className="partner-role">
                <Translate id="homepage.collab.content">
                  Open-source hamjamiyat
                </Translate>
              </p>
            </div>
          </div>

          {/* Center Connection */}
          <div
            className={`collab-connection ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="connection-center">
              <span className="connection-label">X</span>
            </div>
          </div>

          {/* Right Partner - HumblebeeAI */}
          <a href="https://humblebee.ai" target="_blank">
            <div
              className={`collab-partner collab-partner-right ${
                isInView ? "animate-slide-up" : "init-slide-up"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="partner-card">
                <div className="partner-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="partner-name">HumblebeeAI</h3>
                <p className="partner-role">
                  <Translate id="homepage.collab.translation.title">
                    Tarjima va lokalizatsiya
                  </Translate>
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Result Badge */}
        <a
          href="https://github.com/humblebeeai/learnprompting.uz"
          target="_blank"
        >
          <div
            className={`collab-result ${
              isInView ? "animate-slide-up" : "init-slide-up"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="result-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>
                <Translate id="homepage.collab.license">
                  100% bepul va ochiq manba
                </Translate>
              </span>
            </div>
          </div>
        </a>

        <div
          className={`collab-footer ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.5s" }}
        >
          <p className="collab-text">
            <Translate
              id="homepage.collab.text"
              values={{
                humblebee: (
                  <strong>
                    <a href="https://humblebee.ai" target="_blank">
                      HumblebeeAI
                    </a>
                  </strong>
                ),
                learnprompting: <strong>Learn Prompting</strong>,
              }}
            >
              {
                "O'zbek versiyasi {humblebee} tomonidan yuritiladi. Kontent {learnprompting} ochiq manbali hamjamiyati tomonidan yaratilgan."
              }
            </Translate>
          </p>

          <Link className="collab-link" to="/about-collaboration">
            <Translate id="homepage.collab.link">
              Hamkorlik haqida batafsil
            </Translate>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L8 3M13 8L8 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={translate({
        id: "homepage.meta.title",
        message: "AI Bilan Muloqot",
      })}
      description={translate({
        id: "homepage.meta.description",
        message: "Learn Prompting × HumblebeeAI Hamkorligi",
      })}
    >
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
