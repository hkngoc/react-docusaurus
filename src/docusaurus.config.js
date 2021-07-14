import {
  Avatar,
  Logo,
} from 'components';

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
          src: Logo,
          alt: 'My Site Logo',
        },
        hideOnScroll: false,
        items: [{
          type: 'doc',
          position: 'left',
          label: 'Docs',
          to: '/docs'
        }, {
          type: 'doc',
          position: 'custom',
          label: 'Docs',
          to: '/docs',
          renderer: Avatar,
        }],
      },
      hideableSidebar: true,
    }
  },
};

export default config;
