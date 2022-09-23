/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Link } from '@react-docusaurus/core';
import { useBaseUrl } from '@react-docusaurus/core';
import { useDocusaurusContext } from '@react-docusaurus/core';
import { useThemeConfig } from '@react-docusaurus/theme-common';

import ThemedImage from '../ThemedImage';

const LogoThemedImage = ({
  logo,
  alt,
  imageClassName,
}) => {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );

  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
};

const Logo = (props) => {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    // @ts-ignore
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();


  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo?.href || '/');

  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? '' : title;

  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && {target: logo.target})}>
      {logo && (
        <LogoThemedImage
          logo={logo}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
};

export default Logo;
