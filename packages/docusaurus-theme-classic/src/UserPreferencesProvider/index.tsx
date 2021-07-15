/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import UserPreferencesContext from '../contexts/UserPreferencesContext';

export const UserPreferencesProvider = ({ children }) => {
  return (
    <UserPreferencesContext.Provider value={undefined}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
