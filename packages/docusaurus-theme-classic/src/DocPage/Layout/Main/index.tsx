/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import { useDocsSidebar } from '@react-docusaurus/theme-common';

const DocPageLayoutMain = ({ hiddenSidebarContainer, children, }): JSX.Element => {
  const sidebar = useDocsSidebar();

  return (
    <main
      className={clsx(
        'docMainContainer',
        (hiddenSidebarContainer || !sidebar) && 'docMainContainerEnhanced',
      )}
    >
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          'docItemWrapper',
          hiddenSidebarContainer && 'docItemWrapperEnhanced',
        )}>
        {children}
      </div>
    </main>
  );
};

export default DocPageLayoutMain;
