/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DocusaurusContext from '@docusaurus/core/lib/client/exports/context';

export const DocusaurusProvider = ({ config, id, children }) => {
  return (
    <DocusaurusContext.Provider
      value={{
        ...config
      }}
    >
      {
        id ? (
          <div id={id}>
            {children}
          </div>
        ) : (
          children
        )
      }
    </DocusaurusContext.Provider>
  );
};

export default DocusaurusProvider;
