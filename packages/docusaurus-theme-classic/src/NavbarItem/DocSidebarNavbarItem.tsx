/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/lib/client';
import { useLayoutDocsSidebar } from '@react-docusaurus/theme-common';
import DefaultNavbarItem from './DefaultNavbarItem';

const DocSidebarNavbarItem = ({
  sidebarId,
  label,
  docsPluginId,
  ...props
}): JSX.Element => {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const sidebarLink = useLayoutDocsSidebar(sidebarId, docsPluginId).link;
  if (!sidebarLink) {
    throw new Error(
      `DocSidebarNavbarItem: Sidebar with ID "${sidebarId}" doesn't have anything to be linked to.`,
    );
  }
  return (
    // @ts-ignore
    <DefaultNavbarItem
      exact={true}
      {...props}
      isActive={() => activeDoc?.sidebar === sidebarId}
      label={label ?? sidebarLink.label}
      to={sidebarLink.path}
    />
  );
};

export default DocSidebarNavbarItem;
