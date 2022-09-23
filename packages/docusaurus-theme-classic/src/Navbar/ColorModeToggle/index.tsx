/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { useThemeConfig, useColorMode } from '@react-docusaurus/theme-common';

import ColorModeToggle from '../../ColorModeToggle';

const NavbarColorModeToggle = ({ className }) => {
  // @ts-ignore
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();

  if (disabled) {
    return null;
  }

  return (
    <ColorModeToggle
      className={className}
      value={colorMode}
      onChange={setColorMode}
    />
  )
};

export default NavbarColorModeToggle;
