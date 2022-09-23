/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ComponentProps} from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@react-docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@react-docusaurus/theme-common';
import NavbarMobileSidebar from '../MobileSidebar';

const NavbarBackdrop = (props: ComponentProps<'div'>) => {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  );
};

const NavbarLayout = ({children}): JSX.Element => {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <nav
      ref={navbarRef}
      className={clsx(
        'navbar',
        'navbar--fixed-top',
        hideOnScroll && [
          'navbarHideable',
          !isNavbarVisible && 'navbarHidden',
        ],
        {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}>
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
};

export default NavbarLayout;
