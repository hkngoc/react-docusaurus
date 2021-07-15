import { useState, useCallback } from 'react';
import clsx from 'clsx';

import { useLocation, matchPath } from '@docusaurus/core/lib/client/exports/router';
import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';

import { ThemeClassNames } from '@docusaurus/theme-common/lib/utils/ThemeClassNames';

import Layout from 'theme-classic/Layout';
import DocSidebar from 'theme-classic/DocSidebar';
import IconArrow from 'theme-classic/IconArrow';
import NotFound from 'theme-classic/NotFound';

import './styles.css';

const getSidebar = ({ docsSidebars, currentDocRoute }) => {
  const { sidebarName } = currentDocRoute;

  const sidebar = docsSidebars[sidebarName];

  return {
    sidebar,
    sidebarName,
  }
};

const DocPageContent = ({ children, ...props }) => {
  const {
    sidebars: docsSidebars,
    currentDocRoute,
  } = props;

  const { sidebarName, sidebar } = getSidebar({ docsSidebars, currentDocRoute });

  const { siteConfig, isClient } = useDocusaurusContext();
  const [ hiddenSidebarContainer, setHiddenSidebarContainer ] = useState(false);
  const [ hiddenSidebar, setHiddenSidebar ] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer);
    // eslint-disable-next-line
  }, [hiddenSidebar]);

  return (
    <Layout
      key={isClient}
      wrapperClassName={ThemeClassNames.wrapper.docPages}
      pageClassName={ThemeClassNames.page.docPage}
    >
      <div className={"docPage"}>
        {sidebar && (
          <aside
            className={clsx("docSidebarContainer", {
              "docSidebarContainerHidden": hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (!e.currentTarget.classList.contains("docSidebarContainer")) {
                return;
              }

              if (hiddenSidebarContainer) {
                setHiddenSidebar(true);
              }
            }}
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              sidebarName={sidebarName}
              path={currentDocRoute.path}
              sidebarCollapsible={
                siteConfig.themeConfig?.sidebarCollapsible ?? true
              }
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />

            {
              hiddenSidebar && (
                <div
                  className={"collapsedDocSidebar"}
                  title={"Expand sidebar"}
                  aria-label={"Expand sidebar"}
                  tabIndex={0}
                  role="button"
                  onKeyDown={toggleSidebar}
                  onClick={toggleSidebar}
                >
                  <IconArrow className={"expandSidebarButtonIcon"} />
                </div>
              )
            }
          </aside>
        )}
        <main
          className={
            clsx("docMainContainer", {
              "docMainContainerEnhanced": hiddenSidebarContainer || !sidebar,
            })
          }
        >
          <div
            className={
              clsx(
                "container padding-top--md padding-bottom--lg",
                "docItemWrapper", {
                  "docItemWrapperEnhanced": hiddenSidebarContainer,
                },
              )
            }
          >
            <div className="row">
              <div
                className={clsx('col', {
                  docItemCol: false,
                })}
              >
                <div className={"docItemContainer"}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

const DocPage = (props) => {
  const { routes: docRoutes } = props;

  const { pathname } = useLocation();

  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(pathname, docRoute),
  );

  if (!currentDocRoute) {
    return <NotFound {...props} />;
  }

  return (
    <DocPageContent
      currentDocRoute={currentDocRoute}
      {...props}
    />
  );
};

export default DocPage;
