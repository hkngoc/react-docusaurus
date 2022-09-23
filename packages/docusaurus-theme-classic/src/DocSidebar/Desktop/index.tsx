/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import { useThemeConfig } from '@react-docusaurus/theme-common';
import Logo from '../../Logo';
import CollapseButton from './CollapseButton';
import Content from './Content';

const DocSidebarDesktop = ({path, sidebar, onCollapse, isHidden}) => {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        'sidebar',
        hideOnScroll && 'sidebarWithHideableNavbar',
        isHidden && 'sidebarHidden',
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={'sidebarLogo'} />}
      {/* @ts-ignore */}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
