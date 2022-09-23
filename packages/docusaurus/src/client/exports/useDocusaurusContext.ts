/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useContext} from 'react';
import { DocusaurusContext } from '../docusaurusContext';
import type { DocusaurusContext as DocusaurusContextType } from '@docusaurus/types';

export function useDocusaurusContext(): DocusaurusContextType {
  const context = useContext(DocusaurusContext);
  if (!context) {
    throw new Error('Unexpected: no Docusaurus route context found');
  }
  return context;
}
