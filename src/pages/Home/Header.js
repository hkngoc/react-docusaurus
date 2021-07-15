import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';
import Link from '@docusaurus/core/lib/client/exports/Link';

import './styles.css';

const Header = () => {
  const {
    siteConfig: {
      title,
      tagline
    }
  } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', "heroBanner")}>
      <div className="container">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{tagline}</p>
        <div className={"buttons"}>
          <Link
            className="button button--secondary button--lg"
            to="/docs"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
