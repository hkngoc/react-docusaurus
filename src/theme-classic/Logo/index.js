import useDocusaurusContext from 'theme-core/useDocusaurusContext';
import useBaseUrl from 'theme-core/useBaseUrl';

import Link from 'theme-core/Link';
import ThemedImage from 'theme-classic/ThemedImage';

const Logo = (props) => {
  const {
    siteConfig: {
      title,
      themeConfig: {
        navbar: {
          title: navbarTitle,
          logo = { src: ''}
        },
      },
    },
    isClient,
  } = useDocusaurusContext();

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo.href || '/');
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo.target && {target: logo.target})}
    >
      {logo.src && (
        <ThemedImage
          key={isClient}
          className={imageClassName}
          sources={sources}
          alt={logo.alt || navbarTitle || title}
        />
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
};

export default Logo;
