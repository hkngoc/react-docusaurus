import clsx from 'clsx';

import LayoutProviders from 'theme-classic/LayoutProviders';

import Navbar from 'theme-classic/Navbar';
import Footer from 'theme-classic/Footer';

import './styles.css';

const Layout = (props) => {
  const { children, noFooter, wrapperClassName, pageClassName } = props;

  return (
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
  );
};

export default Layout;
