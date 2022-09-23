/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ComponentProps} from 'react';
import { useThemeConfig } from '@react-docusaurus/theme-common';
import { useNavbarSecondaryMenu } from '@react-docusaurus/theme-common';

const SecondaryMenuBackButton = (props: ComponentProps<'button'>) => {
  return (
    <button {...props} type="button" className="clean-btn navbar-sidebar__back">
      { "← Back to main menu" }
    </button>
  );
};

// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
const NavbarMobileSidebarSecondaryMenu = (): JSX.Element | null => {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const secondaryMenu = useNavbarSecondaryMenu();

  return (
    <>
      {/* edge-case: prevent returning to the primaryMenu when it's empty */}
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      {secondaryMenu.content}
    </>
  );
}

export default NavbarMobileSidebarSecondaryMenu;
