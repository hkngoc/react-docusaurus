import useDocusaurusContext from 'theme-core/useDocusaurusContext';

export const useThemeConfig = () => {
  const {
    siteConfig: {
      themeConfig
    }
  } = useDocusaurusContext();

  return themeConfig;
};
