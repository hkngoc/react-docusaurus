/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import LayoutProviders from '../LayoutProviders';

import Navbar from '../Navbar';
import Footer from '../Footer';

export const Layout = (props) => {
  const { children, noFooter, wrapperClassName, pageClassName } = props;

  return (
    <LayoutProviders>
      <Navbar />
      <div
        className={clsx(
          "main-wrapper",
          wrapperClassName,
          pageClassName,
        )}
      >
        {children}
      </div>
      {!noFooter && <Footer />}
    </LayoutProviders>
  );
};

export default Layout;
