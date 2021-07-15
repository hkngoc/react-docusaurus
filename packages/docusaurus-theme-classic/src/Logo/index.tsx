/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';
import useBaseUrl, { addBaseUrl } from '../hooks/useBaseUrl';

import { Link } from '../Link';
import ThemedImage from '../ThemedImage';

const Logo = (props) => {
  const {
    siteConfig: {
      title,
      themeConfig: {
        navbar: {
          // @ts-ignore
          title: navbarTitle,
          // @ts-ignore
          logo = { src: ''}
        },
      },
      baseUrl = '/',
      url: siteUrl,
    },
    isClient,
  } = useDocusaurusContext();

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo.href || '/');
  const sources = {
    light: (typeof (logo.src) == "string") ? addBaseUrl(siteUrl, baseUrl, logo.src) : logo.src,
    dark: (typeof (logo.srcDark) == "string" || typeof (logo.src) == "string") ? addBaseUrl(siteUrl, baseUrl, logo.srcDark || logo.src) : (logo.srcDark || logo.src),
  };


  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo.target && {target: logo.target})}
    >
      {
        logo.src && typeof (logo.src) == "string" && (
          <ThemedImage
            key={isClient}
            className={imageClassName}
            sources={sources}
            alt={logo.alt || navbarTitle || title}
          />
        )
      }
      {
        typeof (logo.src) == "function" && (
          <logo.src className={imageClassName} />
        )
      }
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
};

export default Logo;
