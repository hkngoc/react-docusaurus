/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DocSidebarItemCategory from './Category';
import DocSidebarItemLink from './Link';
import DocSidebarItemHtml from './Html';

export default function DocSidebarItem({
  item,
  ...props
}): JSX.Element | null {
  switch (item.type) {
    case 'category':
      // @ts-ignore
      return <DocSidebarItemCategory item={item} {...props} />;
    case 'html':
      // @ts-ignore
      return <DocSidebarItemHtml item={item} {...props} />;
    case 'link':
    default:
      // @ts-ignore
      return <DocSidebarItemLink item={item} {...props} />;
  }
}
