/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ThemeContext from '../contexts/ThemeContext';
import useTheme from '../hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <ThemeContext.Provider
      //@ts-ignore
      value={{
        isDarkTheme,
        setLightTheme,
        setDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;
