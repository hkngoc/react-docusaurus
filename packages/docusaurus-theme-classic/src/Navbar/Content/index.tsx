/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react';
import { useThemeConfig } from '@react-docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@react-docusaurus/theme-common';
import NavbarItem from '../../NavbarItem';
import NavbarColorModeToggle from '../ColorModeToggle';
import NavbarMobileSidebarToggle from '../MobileSidebar/Toggle';
import NavbarLogo from '../Logo';

const useNavbarItems = () => {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
};

const NavbarItems = ({items}: { items: [] }): JSX.Element => {
  return (
    <>
      {items.map((item, i) => (
        // @ts-ignore
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
};

const NavbarContentLayout = ({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) => {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
};

const NavbarContent = (): JSX.Element => {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [ leftItems, rightItems ] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          {/* @ts-ignore */}
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          {/* @ts-ignore */}
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={'colorModeToggle'} />
        </>
      }
    />
  );
}

export default NavbarContent;
