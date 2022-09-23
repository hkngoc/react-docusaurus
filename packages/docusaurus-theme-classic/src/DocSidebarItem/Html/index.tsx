/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';

const DocSidebarItemHtml = ({
  item,
  level,
  index,
}): JSX.Element => {
  const { value, defaultStyle, className } = item;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && ['menuHtmlItem', 'menu__list-item'],
        className,
      )}
      key={index}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default DocSidebarItemHtml;
