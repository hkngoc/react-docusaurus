/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { memo } from 'react';
import { DocSidebarItemsExpandedStateProvider } from '@react-docusaurus/theme-common';
import DocSidebarItem from '../DocSidebarItem';

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
function DocSidebarItems({items, ...props}): JSX.Element {
  return (
    <DocSidebarItemsExpandedStateProvider>
      {items.map((item, index) => (
        <DocSidebarItem key={index} item={item} index={index} {...props} />
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
}

// Optimize sidebar at each "level"
export default memo(DocSidebarItems);
 