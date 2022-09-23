/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useState,
} from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@react-docusaurus/theme-common';
import DocSidebarItems from '../../../DocSidebarItems';

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

const DocSidebarDesktopContent = ({
  path,
  sidebar,
  className,
}): JSX.Element => {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    <nav
      className={clsx(
        'menu thin-scrollbar',
        'menu',
        showAnnouncementBar && 'menuWithAnnouncementBar',
        className,
      )}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}

export default DocSidebarDesktopContent;
