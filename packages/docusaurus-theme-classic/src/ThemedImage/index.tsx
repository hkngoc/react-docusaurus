/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';
import useThemeContext from '../hooks/useThemeContext';

const ThemedImage = (props) => {
  const { isClient } = useDocusaurusContext();
  // @ts-ignore
  const { isDarkTheme } = useThemeContext();
  const { sources, className, alt = '', ...propsRest } = props;

  const clientThemes = isDarkTheme ? ['dark'] : ['light'];

  const renderedSourceNames = isClient
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
