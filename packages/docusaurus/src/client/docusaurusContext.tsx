/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import type { DocusaurusContext as  DocusaurusContextType } from '@docusaurus/types';

export const DocusaurusContext = React.createContext<DocusaurusContextType | null>(null);

export function DocusaurusContextProvider({
  value,
  children,
  id,
}: { value: any, children: ReactNode, id?: string }): JSX.Element {
  return (
    <DocusaurusContext.Provider value={value}>
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
}
