/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { NavLink, Link as RRLink } from 'react-router-dom';

import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';
import { applyTrailingSlash } from '@docusaurus/utils-common';

// const shouldAddBaseUrlAutomatically = (to) => to.startsWith('/');

export const Link = ({ isNavLink, to, href, activeClassName, isActive, 'data-noBrokenLinkCheck': noBrokenLinkCheck, autoAddBaseUrl = true, ...props }) => {
  const { siteConfig: { trailingSlash, baseUrl }, } = useDocusaurusContext();

  const targetLinkUnprefixed = to || href;
  const targetLinkWithoutPathnameProtocol = targetLinkUnprefixed === null || targetLinkUnprefixed === undefined ? undefined : targetLinkUnprefixed.replace('pathname://', '');
  const targetLink = applyTrailingSlash(targetLinkWithoutPathnameProtocol || '', { trailingSlash, baseUrl });

  const LinkComponent = isNavLink ? NavLink : RRLink;

  return React.createElement(
    LinkComponent, {
      ...props,
      to: targetLink || '',
      ...(isNavLink && { isActive, activeClassName })
    });
};

export default Link;
