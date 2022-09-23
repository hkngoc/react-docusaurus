/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@react-docusaurus/theme-common';
import NavbarMobileSidebarLayout from './Layout';
import NavbarMobileSidebarHeader from './Header';
import NavbarMobileSidebarPrimaryMenu from './PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from './SecondaryMenu';

const NavbarMobileSidebar = (): JSX.Element | null => {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}

export default NavbarMobileSidebar;
