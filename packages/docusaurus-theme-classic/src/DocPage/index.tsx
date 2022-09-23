/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import clsx from 'clsx';

import {
  HtmlClassNameProvider,
  ThemeClassNames,
  PageMetadata,
} from '@react-docusaurus/theme-common';

import {
  DocsSidebarProvider,
  DocsVersionProvider,
  useDocRouteMetadata,
} from '@react-docusaurus/theme-common';

import DocPageLayout from './Layout';
import NotFound from '../NotFound';

const DocPageMetadata = (props): JSX.Element => {
  const { versionMetadata } = props;

  return (
    <>
      <PageMetadata>
        {versionMetadata.noIndex && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </PageMetadata>
    </>
  );
};

export const DocPage = (props) => {
  const { versionMetadata } = props;
  const currentDocRouteMetadata = useDocRouteMetadata(props);

  if (!currentDocRouteMetadata) {
    return <NotFound />;
  }

  const {docElement, sidebarName, sidebarItems} = currentDocRouteMetadata;

  return (
    <>
      <DocPageMetadata {...props} />
      <HtmlClassNameProvider
        className={clsx(
          // TODO: it should be removed from here
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage,
          props.versionMetadata.className,
        )}>
        <DocsVersionProvider version={versionMetadata}>
          <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
            <DocPageLayout>{docElement}</DocPageLayout>
          </DocsSidebarProvider>
        </DocsVersionProvider>
      </HtmlClassNameProvider>
    </>
  );
};

export default DocPage;
