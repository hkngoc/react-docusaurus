/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useThemeConfig } from '@react-docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@react-docusaurus/theme-common';
import NavbarItem from '../../../NavbarItem';

const useNavbarItems = () => {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
};

// The primary menu displays the navbar items
const NavbarMobilePrimaryMenu = (): JSX.Element => {
  const mobileSidebar = useNavbarMobileSidebar();

  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const items = useNavbarItems();

  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        // @ts-ignore
        <NavbarItem
          mobile
          // @ts-ignore
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}

export default NavbarMobilePrimaryMenu;
