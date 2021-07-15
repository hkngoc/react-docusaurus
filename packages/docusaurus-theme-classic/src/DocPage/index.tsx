/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import clsx from 'clsx';

import { useLocation, matchPath } from 'react-router-dom';
import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';

import { ThemeClassNames } from '@docusaurus/theme-common/lib/utils/ThemeClassNames';

import Layout from '../Layout';
import DocSidebar from '../DocSidebar';
import IconArrow from '../IconArrow';
import NotFound from '../NotFound';

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
              //@ts-ignore
              sidebarCollapsible={siteConfig.themeConfig?.sidebarCollapsible ?? true}
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

export const DocPage = (props) => {
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
