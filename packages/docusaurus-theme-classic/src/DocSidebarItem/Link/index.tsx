/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@react-docusaurus/theme-common';

import { Link } from '@react-docusaurus/core';
import { isInternalUrl } from '@react-docusaurus/core';
import IconExternalLink from '../../Icon/ExternalLink';

const DocSidebarItemLink = ({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}): JSX.Element => {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && 'menuExternalLink',
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}

export default DocSidebarItemLink;
