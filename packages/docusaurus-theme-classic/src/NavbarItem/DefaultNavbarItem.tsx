/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import NavbarNavLink from './NavbarNavLink';

const DefaultNavbarItemDesktop = ({
  className,
  isDropdownItem = false,
  ...props
}) => {
  const element = (
    // @ts-ignore
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link',
        className,
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li>{element}</li>;
  }

  return element;
};

const DefaultNavbarItemMobile = ({
  className,
  isDropdownItem,
  ...props
}) => {
  return (
    <li className="menu__list-item">
      {/* @ts-ignore */}
      <NavbarNavLink className={clsx('menu__link', className)} {...props} />
    </li>
  );
};

const DefaultNavbarItem = ({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}): JSX.Element => {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  return (
    // @ts-ignore
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  );
};

export default DefaultNavbarItem;
