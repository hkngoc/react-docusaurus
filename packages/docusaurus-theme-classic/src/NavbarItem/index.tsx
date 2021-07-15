/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import DefaultNavbarItem from '../NavbarItem/DefaultNavbarItem';
// import DocNavbarItem from '../NavbarItem/DocNavbarItem';

const NavbarItemComponents = {
  default: () => DefaultNavbarItem,
  doc: () => DefaultNavbarItem,
  // doc: () => require('../NavbarItem/DocNavbarItem').default,
};

const getNavbarItemComponent = (type = "default", { position, renderer }) => {
  if (position === "custom" && renderer) {
    return renderer;
  }

  const navbarItemComponent = NavbarItemComponents[type];

  if (!navbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }

  return navbarItemComponent();
};

export const NavbarItem = ({ type, renderer, position, ...props }) => {
  const NavbarItemComponent = getNavbarItemComponent(type, { renderer, position, ...props });

  return (
    <NavbarItemComponent {...props} />
  );
};

export default NavbarItem;