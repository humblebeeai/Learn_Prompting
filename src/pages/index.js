import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  return (
    <header className="hero hero--primary" style={{ padding: '3rem 0', backgroundColor: 'var(--ifm-color-primary-lightest)', color: '#000' }}>
      <div className="container">
        <h1 className="hero__title" style={{ marginBottom: '0.5rem', fontWeight: '800', color: '#000' }}>Learn Prompting</h1>
        <h2 style={{ marginTop: '0', fontSize: '1.5rem', fontWeight: '500', marginBottom: '1.5rem', color: '#000' }}>
          Sun’iy intellekt bilan to‘g‘ri ishlashni o‘rganing
        </h2>
        <p className="hero__subtitle" style={{ maxWidth: '700px', margin: '0 auto 2rem auto', fontSize: '1.1rem', lineHeight: '1.5', color: '#000' }}>
          Sun’iy intellekt bilan qanday qilib aniq savol berish, to‘g‘ri javob olish va real vazifalarda ishlatishni o‘rgatuvchi bepul, ochiq manbali qo‘llanma.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro"
            style={{ minWidth: '200px' }}>
            🇺🇿 O‘zbekcha boshlash
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/en/docs/intro"
            style={{ minWidth: '200px', backgroundColor: 'white', color: '#000' }}>
            🇬🇧 Start in English
          </Link>
        </div>
      </div>
    </header>
  );
}

function WhySection() {
  return (
    <section style={{ padding: '3rem 0', backgroundColor: '#f5f6f7', color: '#000' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h3 style={{ marginBottom: '2rem', color: '#000' }}>Learn Prompting sizga quyidagilarni o‘rgatadi:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', textAlign: 'left' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', color: '#000' }}>
                <span style={{ marginRight: '0.5rem', color: 'var(--ifm-color-success)' }}>✔</span>
                Sun’iy intellekt qanday fikrlashi va javob berishini
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', color: '#000' }}>
                <span style={{ marginRight: '0.5rem', color: 'var(--ifm-color-success)' }}>✔</span>
                Yaxshi prompt yozishning asosiy va ilg‘or usullarini
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', color: '#000' }}>
                <span style={{ marginRight: '0.5rem', color: 'var(--ifm-color-success)' }}>✔</span>
                AI’ni o‘qish, ish va real loyihalarda samarali qo‘llashni
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollaborationSection() {
  return (
    <section style={{ padding: '1.5rem 0', backgroundColor: '#ebedf0', borderTop: '1px solid #dadde1', fontSize: '0.9rem', color: '#000' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#606770' }}>
          HumblebeeAI tomonidan qo‘llab-quvvatlanadi
        </div>
        <p style={{ marginBottom: '0.5rem', color: '#000' }}>
          O‘zbek va rus tillaridagi tarjima versiyalari <strong>HumblebeeAI</strong> tomonidan yuritiladi.
          <br />
          Asl kontent <strong>Learn Prompting</strong> ochiq manbali hamjamiyati tomonidan yaratilgan.
        </p>
        <div style={{ marginTop: '0.5rem' }}>
          <Link to="/about-collaboration">👉 Hamkorlik haqida batafsil</Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`AI Bilan Muloqot`}
      description="Learn Prompting × HumblebeeAI Hamkorligi">
      <HomepageHeader />
      <main>
        <WhySection />
        <CollaborationSection />
      </main>
    </Layout>
  );
}
