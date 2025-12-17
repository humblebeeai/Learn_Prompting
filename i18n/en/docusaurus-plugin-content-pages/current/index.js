import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero hero--primary" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
          <Link
            className="button button--secondary button--lg"
            to="/en/docs/intro">
            Start Learning (English)
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            O'rganishni Boshlash (O'zbek)
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Learn Prompting × HumblebeeAI Collaboration">
      <HomepageHeader />
      <main>
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <h2>Supported by HumblebeeAI</h2>
          <p>
            Empowering the Central Asian AI community through open education.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/about-collaboration">Read more about this collaboration</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
