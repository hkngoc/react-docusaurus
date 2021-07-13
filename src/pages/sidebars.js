const sidebars = {
  docs: [
    {
      label: 'Introduction',
      href: ''
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        {
          label: 'Installation',
          href: 'installation'
        },
        {
          label: 'Configuration',
          href: 'configuration'
        },
        {
          label: 'TypeScript Support',
          href: 'typescript-support'
        }
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          label: 'Creating Pages',
          href: 'creating-pages',
        },
        {
          type: 'category',
          label: 'Docs',
          items: [
            {
              label: 'Introduction',
              href: 'docs-introduction'
            },
            {
              label: 'Create a doc',
              href: 'docs-create-doc'
            },
            {
              label: 'Sidebar',
              href: 'docs-sidebar'
            },
            {
              label: 'Versioning',
              href: 'docs-versioning'
            },
            {
              label: 'Docs Markdown Features',
              href: 'docs-markdown-features'
            },
            {
              label: 'Docs Multi-instance',
              href: 'docs-multi-instance'
            },
          ],
        },
        {
          href: 'blog',
          label: 'Blog',
        },
        {
          type: 'category',
          label: 'Markdown Features',
          items: [
            {
              label: 'Introduction',
              href: 'markdown-features',
            },
            {
              label: 'Using React',
              href: 'markdown-features/react',
            },
            {
              label: 'Tabs',
              href: 'markdown-features/tabs',
            },
            {
              label: 'Code blocks',
              href: 'markdown-features/code-blocks',
            },
            {
              label: 'Admonitions',
              href: 'markdown-features/admonitions',
            },
            {
              label: 'Headings',
              href: 'markdown-features/headings',
            },
            {
              label: 'Inline TOC',
              href: 'markdown-features/inline-toc',
            },
            {
              label: 'Assets',
              href: 'markdown-features/assets',
            },
            {
              label: 'Plugins',
              href: 'markdown-features/plugins',
            },
            {
              label: 'Math Equations',
              href: 'markdown-features/math-equations',
            },
          ],
        },
        {
          label: 'Styling and Layout',
          href: 'styling-layout'
        },
        {
          label: 'Static Assets',
          href: 'static-assets'
        },
        {
          label: 'Search',
          href: 'search'
        },
        {
          label: 'Browser support',
          href: 'browser-support'
        },
        {
          label: 'Deployment',
          href: 'deployment'
        },
        {
          type: 'category',
          label: 'Internationalization',
          items: [
            {
              type: 'doc',
              id: 'i18n/introduction',
              label: 'Introduction',
            },
            {
              type: 'doc',
              id: 'i18n/tutorial',
              label: 'Tutorial',
            },
            {
              type: 'doc',
              id: 'i18n/git',
              label: 'Using Git',
            },
            {
              type: 'doc',
              id: 'i18n/crowdin',
              label: 'Using Crowdin',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced Guides',
      items: [
        {
          label: 'Plugins',
          href: 'using-plugins'
        },
        {
          label: 'Themes',
          href: 'using-themes'
        },
        {
          label: 'Presets',
          href: 'presets'
        },
      ],
    },
    {
      type: 'category',
      label: 'Migrating from v1 to v2',
      items: [
        {
          label: 'Migration overview',
          href: 'migration/migration-overview'
        },
        {
          label: 'Automated migration',
          href: 'migration/migration-automated'
        },
        {
          label: 'Manual migration',
          href: 'migration/migration-manual'
        }
      ],
    },
  ]
};

export default sidebars;
