/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import clsx from 'clsx';
import { useThemeConfig } from '@react-docusaurus/theme-common';

const Footer = ({ style = undefined }) => {
  const {footer} = useThemeConfig();

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
      </div>
    </footer>
  );
};

export default Footer;
