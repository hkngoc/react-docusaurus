import useDocusaurusContext from 'theme-core/useDocusaurusContext';
import useBaseUrl, { addBaseUrl } from 'theme-core/useBaseUrl';

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
      baseUrl = '/',
      url: siteUrl,
    },
    isClient,
  } = useDocusaurusContext();

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo.href || '/');
  const sources = {
    light: (typeof (logo.src) == "string") ? addBaseUrl(siteUrl, baseUrl, logo.src) : logo.src,
    dark: (typeof (logo.srcDark) == "string" || typeof (logo.src) == "string") ? addBaseUrl(siteUrl, baseUrl, logo.srcDark || logo.src) : (logo.srcDark || logo.src),
  };


  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo.target && {target: logo.target})}
    >
      {
        logo.src && typeof (logo.src) == "string" && (
          <ThemedImage
            key={isClient}
            className={imageClassName}
            sources={sources}
            alt={logo.alt || navbarTitle || title}
          />
        )
      }
      {
        typeof (logo.src) == "function" && (
          <logo.src className={imageClassName} />
        )
      }
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
};

export default Logo;
