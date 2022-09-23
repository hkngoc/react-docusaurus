/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useNavbarMobileSidebar } from '@react-docusaurus/theme-common';
import NavbarColorModeToggle from '../../ColorModeToggle';
import IconClose from '../../../Icon/Close';
import NavbarLogo from '../../Logo';

const CloseButton = () => {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <button
      type="button"
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
};

const NavbarMobileSidebarHeader = (): JSX.Element => {
  return (
    <div className="navbar-sidebar__brand">
      <NavbarLogo />
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  );
};

export default NavbarMobileSidebarHeader;
