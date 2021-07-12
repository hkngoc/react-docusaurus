import clsx from 'clsx';

import useDocusaurusContext from 'theme-core/useDocusaurusContext';
import useThemeContext from 'theme-classic/hooks/useThemeContext';

import './styles.css';

const ThemedImage = (props) => {
  const { isClient } = useDocusaurusContext();
  const { isDarkTheme } = useThemeContext();
  const { sources, className, alt = '', ...propsRest } = props;

  const clientThemes = isDarkTheme ? ['dark'] : ['light'];

  const renderedSourceNames = isClient
    ? clientThemes
    : // We need to render both images on the server to avoid flash
      // See https://github.com/facebook/docusaurus/pull/3730
      ['light', 'dark'];

  return (
    <>
      {renderedSourceNames.map((sourceName) => (
        <img
          key={sourceName}
          src={sources[sourceName]}
          alt={alt}
          className={clsx(
            'themedImage',
            [`themedImage--${sourceName}`],
            className,
          )}
          {...propsRest}
        />
      ))}
    </>
  );
};

export default ThemedImage;
