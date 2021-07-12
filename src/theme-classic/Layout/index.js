import clsx from 'clsx';

import DocusaurusProvider from 'theme-core/DocusaurusProvider';
import LayoutProviders from 'theme-classic/LayoutProviders';

import Navbar from 'theme-classic/Navbar';
import Footer from 'theme-classic/Footer';

import './styles.css';

const Layout = ({ config, ...props }) => {
  const { children, noFooter, wrapperClassName, pageClassName } = props;

  return (
    <DocusaurusProvider
      config={config}
    >
      <LayoutProviders>
        <Navbar />
        <div
          className={clsx(
            "main-wrapper",
            wrapperClassName,
            pageClassName,
          )}
        >
          {children}
        </div>
        {!noFooter && <Footer />}
      </LayoutProviders>
    </DocusaurusProvider>
  );
};

export default Layout;
