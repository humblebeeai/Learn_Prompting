import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function AboutCollaboration() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Hamkorlik Haqida"
      description="Learn Prompting va HumblebeeAI hamkorligi"
    >
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ minHeight: "60vh", padding: "4rem 0" }}
      >
        <div className="hero-background">
          <div
            className="hero-gradient-orb hero-orb-1"
            style={{ opacity: 0.5 }}
          />
          <div className="hero-grid" />
        </div>

        <div
          className="container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <div
            className="badge-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(16, 185, 129, 0.1)",
              color: "var(--color-brand-primary)",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: "600",
              marginBottom: "2rem",
            }}
          >
            <span>O'zbekiston uchun maxsus</span>
          </div>

          <h1
            style={{
              fontSize: "3.5rem",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              fontWeight: 800,
            }}
          >
            Zamonaviy bilimlar,{" "}
            <span className="title-accent" style={{ display: "inline" }}>
              Milliy rivojlanish
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
              maxWidth: "700px",
              margin: "0 auto 3rem",
            }}
          >
            Ushbu loyiha <strong>Learn Prompting</strong>ning global tajribasi
            va <strong>HumblebeeAI</strong>ning mahalliy ekspertizasi
            birlashuvidir. Maqsadimiz - O'zbekistonda AI savodxonligini yangi
            bosqichga olib chiqish.
          </p>
        </div>
      </section>

      {/* Partners Logos/Grid */}
      <section
        style={{ padding: "4rem 0", background: "var(--color-bg-secondary)" }}
      >
        <div className="container">
          <div
            className="row"
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: "4rem",
            }}
          >
            {/* Learn Prompting */}
            <div className="col col--5" style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                Learn Prompting
              </h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Dunyodagi eng yirik va mashhur ochiq manbali AI ta'lim
                platformasi. 3 milliondan ortiq foydalanuvchi, Google, OpenAI va
                Microsoft ekspertlari tomonidan e'tirof etilgan.
              </p>
            </div>

            {/* X divider */}
            <div
              style={{ textAlign: "center", fontSize: "2rem", opacity: 0.3 }}
            >
              ×
            </div>

            {/* HumblebeeAI */}
            <div className="col col--5" style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                HumblebeeAI
              </h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Global yetakchi AI kompaniyasi. Bizning maqsadimiz -
                mintaqada sun'iy intellekt texnologiyalarini joriy etish va Top
                1% kadrlar tayyorlash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / President Initiative - High-End Unified Design */}
      <section
        style={{
          padding: "6rem 0",
          background: "linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: "radial-gradient(circle at 2px 2px, var(--color-text-primary) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Unified Card Container */}
          <div style={{
            background: "var(--color-bg-tertiary)",
            borderRadius: "32px",
            border: "1px solid var(--color-border)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
            overflow: "hidden",
            backdropFilter: "blur(10px)"
          }}>
            <div className="row" style={{ margin: 0, alignItems: "stretch" }}>
              {/* Left side - Image with Link */}
              <div className="col col--6" style={{ padding: 0 }}>
                <a
                  href="https://president.uz/oz/lists/view/8719"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    position: "relative",
                    height: "100%",
                    minHeight: "500px",
                    overflow: "hidden",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    const icon = e.currentTarget.querySelector('.hover-icon');
                    if (img) img.style.transform = "scale(1.05)";
                    if (icon) {
                      icon.style.opacity = "1";
                      icon.style.transform = "translate(-50%, -50%)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    const icon = e.currentTarget.querySelector('.hover-icon');
                    if (img) {
                      img.style.transform = "scale(1)";
                    }
                    if (icon) {
                      icon.style.opacity = "0";
                      icon.style.transform = "translate(-50%, -30%)";
                    }
                  }}
                >
                  <img
                    src="/img/5mln-ai-prompters.jpg"
                    alt="5 Million AI Prompters Initiative"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.6s ease",
                    }}
                  />
                  {/* Overlay gradient */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent 50%, rgba(6, 182, 212, 0.1))",
                    pointerEvents: "none"
                  }} />

                  {/* Upright Arrow Icon with Slide-up Animation */}
                  <div
                    className="hover-icon"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -30%)",
                      opacity: 0,
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "50%",
                      width: "64px",
                      height: "64px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      pointerEvents: "none"
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-brand-primary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Right side - Content */}
              <div className="col col--6" style={{ padding: "3rem" }}>
                {/* Badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
                  color: "var(--color-brand-primary)",
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Milliy Tashabbus
                </div>

                <h2 style={{
                  fontSize: "2.5rem",
                  marginBottom: "1.5rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  background: "linear-gradient(135deg, var(--color-text-primary), var(--color-text-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  5 million o'zbek prompt muhandislari
                </h2>

                <p style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                  marginBottom: "2rem"
                }}>
                  Ushbu loyiha O'zbekiston Respublikasi Prezidentining <strong><a href="https://president.uz/oz/lists/view/8719/">Digital Uzbekistan 2030</a></strong> strategiyasidan ilhomlangan holda yaratildi. Biz har bir o'zbekistonlik - xoh u talaba, o'qituvchi yoki tadbirkor bo'lsin - kelajak texnologiyalaridan erkin foydalana olishini istaymiz.
                </p>

                {/* Stats */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem"
                }}>
                  <div style={{
                    padding: "1rem",
                    background: "var(--color-bg-secondary)",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid var(--color-border)"
                  }}>
                    <div style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--color-brand-primary)",
                      marginBottom: "0.25rem"
                    }}>5M+</div>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)"
                    }}>Maqsad</div>
                  </div>
                  <div style={{
                    padding: "1rem",
                    background: "var(--color-bg-secondary)",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid var(--color-border)"
                  }}>
                    <div style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--color-brand-primary)",
                      marginBottom: "0.25rem"
                    }}>100%</div>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)"
                    }}>Bepul</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License & Attribution */}
      <section
        style={{
          padding: "4rem 0",
          background: "var(--color-bg-secondary)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <h3>Litsenziya va Huquqlar</h3>
              <p>
                Ushbu kontent <strong>Creative Commons BY-NC-SA 4.0</strong>{" "}
                litsenziyasi asosida tarqatiladi.
              </p>
              <ul style={{ paddingLeft: "1.2rem", listStyle: "none" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    style={{ flexShrink: 0, marginTop: "0.2rem" }}
                  >
                    <path
                      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22 4 12 14.01 9 11.01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    <strong>Erkin foydalanish:</strong> O'qish, o'rganish va
                    ulashish bepul.
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    style={{ flexShrink: 0, marginTop: "0.2rem" }}
                  >
                    <path
                      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22 4 12 14.01 9 11.01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    <strong>Moslashtirish:</strong> Materiallardan o'quv
                    dasturlari uchun foydalanish mumkin (manba ko'rsatilgan
                    holda).
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    style={{ flexShrink: 0, marginTop: "0.2rem" }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="15"
                      y1="9"
                      x2="9"
                      y2="15"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="9"
                      y1="9"
                      x2="15"
                      y2="15"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    <strong>Tijoriy foydalanish:</strong> Kontentni o'zlashtirib
                    sotish taqiqlanadi.
                  </span>
                </li>
              </ul>
            </div>
            <div className="col col--6">
              <h3>Bizga qo'shiling</h3>
              <p>
                Bu loyiha HumblebeeAI ochiq manba asosida tomonidan yuritiladi.
                Agar sizda takliflar bo'lsa yoki tarjimaga hissa qo'shmoqchi
                bo'lsangiz:
              </p>
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
              >
                <Link
                  className="button button--primary button--lg"
                  to="https://github.com/humblebeeai/Learn_Prompting"
                >
                  Loyihaga o'z hissangizni qo'shing
                </Link>
                <Link
                  className="button button--outline button--lg tg-button"
                  to="https://t.me/humblebeeai"
                >
                  Telegram kanalimiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
