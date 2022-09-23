/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import LayoutProvider from './Provider';

import Navbar from '../Navbar';
import Footer from '../Footer';

export const Layout = (props): JSX.Element => {
  const {
    children,
    noFooter,
    wrapperClassName,
    // pageClassName,
  } = props;

  return (
    <LayoutProvider>
      <Navbar />
      <div
        className={clsx(
          "main-wrapper",
          "mainWrapper",
          wrapperClassName,
          // pageClassName,
        )}
      >
        {children}
      </div>
      {!noFooter && <Footer />}
    </LayoutProvider>
  );
};

export default Layout;
