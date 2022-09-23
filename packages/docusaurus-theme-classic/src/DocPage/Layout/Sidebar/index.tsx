/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import React, {
  Fragment,
  type ReactNode,
  useState,
  useCallback,
} from 'react';
 import clsx from 'clsx';
 import { ThemeClassNames } from '@docusaurus/theme-common';
 import { useDocsSidebar } from '@react-docusaurus/theme-common';
 import { useLocation } from '@docusaurus/router';
 import DocSidebar from '../../../DocSidebar';
 import ExpandButton from './ExpandButton';

const ResetOnSidebarChange = ({ children }: { children: ReactNode }) => {
  const sidebar = useDocsSidebar();

  return (
    <Fragment key={sidebar?.name ?? 'noSidebar'}>
      {children}
    </Fragment>
  );
};

const DocPageLayoutSidebar = ({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}): JSX.Element => {
  const {pathname} = useLocation();

  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        'docSidebarContainer',
        hiddenSidebarContainer && 'docSidebarContainerHidden',
      )}
      onTransitionEnd={(e) => {
        if (!e.currentTarget.classList.contains('docSidebarContainer'!)) {
          return;
        }

        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}
    >
      <ResetOnSidebarChange>
        <DocSidebar
          sidebarName={pathname}
          sidebar={sidebar}
          path={pathname}
          onCollapse={toggleSidebar}
          isHidden={hiddenSidebar}
        />
      </ResetOnSidebarChange>

      {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
    </aside>
  );
};

export default DocPageLayoutSidebar;
