/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import { useIsBrowser } from '@react-docusaurus/core';
import { useColorMode } from '@react-docusaurus/theme-common';

const ThemedImage = (props) => {
  const isBrowser = useIsBrowser();
  // @ts-ignore
  const { colorMode } = useColorMode();
  const { sources, className, alt = '', ...propsRest } = props;

  const clientThemes = colorMode === 'dark' ? ['dark'] : ['light'];

  const renderedSourceNames = isBrowser
    ? clientThemes
    : // We need to render both images on the server to avoid flash
      // See https://github.com/facebook/docusaurus/pull/3730
      ['light', 'dark'];

  return (
    <>
      {renderedSourceNames.map((sourceName) => (
        <img
          key={sourceName}
          src={sources[sourceName]}
          alt={alt}
          className={clsx(
            'themedImage',
            [`themedImage--${sourceName}`],
            className,
          )}
          {...propsRest}
        />
      ))}
    </>
  );
};

export default ThemedImage;
