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
            <span>🇺🇿 O'zbekiston uchun maxsus</span>
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
            birlashuvidir. Maqsadimiz — O'zbekistonda AI savodxonligini yangi
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
              className="col col--1"
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
                Markaziy Osiyodagi yetakchi AI kompaniyasi. Bizning maqsadimiz —
                mintaqada sun'iy intellekt texnologiyalarini joriy etish va Top
                1% kadrlar tayyorlash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / President Initiative */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="row">
            <div
              className="col col--8 col--offset-2"
              style={{ textAlign: "center" }}
            >
              <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
                Nega bu kurs bepul?
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "2rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Biz ishonamizki, sun'iy intellekt bilimlariga ega bo'lish — bu
                hashamat emas, balki zamonaviy dunyoda zaruratdir.
              </p>

              <div
                className="alert alert--info"
                style={{
                  textAlign: "left",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--color-brand-primary)",
                }}
              >
                <h4
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>🇺🇿</span>
                  Milliy Tashabbus
                </h4>
                <p style={{ marginBottom: 0 }}>
                  Ushbu loyiha O'zbekiston Respublikasi Prezidentining{" "}
                  <strong>"5 million o'zbek prompt muhandisi"</strong> (Digital
                  Uzbekistan 2030) strategiyasidan ilhomlangan holda yaratildi.
                  Biz har bir o'zbekistonlik — xoh u talaba, o'qituvchi yoki
                  tadbirkor bo'lsin — kelajak texnologiyalaridan erkin foydalana
                  olishini istaymiz.
                </p>
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
              <ul style={{ paddingLeft: "1.2rem" }}>
                <li>
                  ✅ <strong>Erkin foydalanish:</strong> O'qish, o'rganish va
                  ulashish bepul.
                </li>
                <li>
                  ✅ <strong>Moslashtirish:</strong> Materiallardan o'quv
                  dasturlari uchun foydalanish mumkin (manba ko'rsatilgan
                  holda).
                </li>
                <li>
                  ❌ <strong>Tijoriy foydalanish:</strong> Kontentni
                  o'zlashtirib sotish taqiqlanadi.
                </li>
              </ul>
            </div>
            <div className="col col--6">
              <h3>Bizga qo'shiling</h3>
              <p>
                Bu loyiha hamjamiyat tomonidan yuritiladi. Agar sizda takliflar
                bo'lsa yoki tarjimaga hissa qo'shmoqchi bo'lsangiz:
              </p>
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
              >
                <Link
                  className="button button--primary button--lg"
                  to="https://github.com/humblebeeai/Learn_Prompting"
                >
                  GitHub'da ishtirok eting
                </Link>
                <Link
                  className="button button--outline button--lg"
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
