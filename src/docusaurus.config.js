const config = {
  isClient: true,
  siteConfig: {
    themeConfig: {
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
        switchConfig: {
          darkIcon: '🌜',
          darkIconStyle: {},
          lightIcon: '🌞',
          lightIconStyle: {},
        },
      },
      navbar: {
        title: 'Docusaurus',
        logo: {
          src: 'static/img/logo.svg',
          alt: 'My Site Logo',
        },
        hideOnScroll: false,
        items: [{
          type: 'doc',
          // docId: 'intro',
          position: 'left',
          label: 'Docs',
          to: '/docs'
        }],
      },
      hideableSidebar: true,
    }
  },
};

export default config;
