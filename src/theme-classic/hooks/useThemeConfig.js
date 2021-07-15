import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';

export const useThemeConfig = () => {
  const {
    siteConfig: {
      themeConfig
    }
  } = useDocusaurusContext();

  return themeConfig;
};
