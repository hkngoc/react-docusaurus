import React from 'react';
import { NavLink, Link as RRLink } from 'react-router-dom';

import useDocusaurusContext from 'theme-core/useDocusaurusContext';
import applyTrailingSlash from 'theme-core/applyTrailingSlash';

// const shouldAddBaseUrlAutomatically = (to) => to.startsWith('/');

const Link = ({ isNavLink, to, href, activeClassName, isActive, 'data-noBrokenLinkCheck': noBrokenLinkCheck, autoAddBaseUrl = true, ...props }) => {
  const { siteConfig: { trailingSlash, baseUrl }, } = useDocusaurusContext();

  const targetLinkUnprefixed = to || href;
  const targetLinkWithoutPathnameProtocol = targetLinkUnprefixed === null || targetLinkUnprefixed === void 0 ? void 0 : targetLinkUnprefixed.replace('pathname://', '');
  const targetLink = applyTrailingSlash(targetLinkWithoutPathnameProtocol, { trailingSlash, baseUrl });

  const LinkComponent = isNavLink ? NavLink : RRLink;

  return React.createElement(
    LinkComponent, {
      ...props,
      to: targetLink || '',
      ...(isNavLink && { isActive, activeClassName })
    });
};

export default Link;

