/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useState,
} from 'react';
import { useDocsSidebar } from '@react-docusaurus/theme-common';

import Layout from '../../Layout';
// import BackToTopButton from '@theme/BackToTopButton';
import DocPageLayoutSidebar from './Sidebar';
import DocPageLayoutMain from './Main';

const DocPageLayout = ({ children }): JSX.Element => {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);

  return (
    <Layout wrapperClassName={'docsWrapper'}>
      <div className={'docPage'}>
        {sidebar && (
          <DocPageLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocPageLayoutMain>
      </div>
    </Layout>
  );
};

export default DocPageLayout;
