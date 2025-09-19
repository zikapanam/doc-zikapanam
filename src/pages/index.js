import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          🎶 Zikapanam | La musique, ensemble ! 🎸<br/>
          🎤 Jams, répètes, scènes ouvertes & concerts<br/>
          🎵 Du jazz au métal, de la musique trad à celle de chambre<br/>
          📍 Paris & petite couronne<br/>
          🤝 Rejoins-nous<br/>
        </p>
        <p>
          <iframe class="video-iframe"
            src="https://youtube.com/embed/dMLM8O9GN2Y"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
        </p>
        <p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/fonctionnement/intro">
              ➡️ Cliquez ici pour vous inscrire et/ou cotiser
            </Link>
          </div>
        </p>
        <p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/fonctionnement/intro">
              ➡️ Cliquez ici pour plus d'informations sur l'association
            </Link>
          </div>
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Découvrez l'association Zikapanam, une association de musiciens amateurs adultes qui organise des jams, répétitions, concerts, scène ouverte">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
