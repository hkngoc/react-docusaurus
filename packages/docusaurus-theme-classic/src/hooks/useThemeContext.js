/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from 'react';

import ThemeContext from '../contexts/ThemeContext';

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default useThemeContext;
