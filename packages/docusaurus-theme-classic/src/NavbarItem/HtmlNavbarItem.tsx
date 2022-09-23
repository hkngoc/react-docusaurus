/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

const HtmlNavbarItem = ({
  value,
  className,
  mobile = false,
  isDropdownItem = false,
}): JSX.Element => {
  const Comp = isDropdownItem ? 'li' : 'div';

  return (
    <Comp
      className={clsx(
        {
          navbar__item: !mobile && !isDropdownItem,
          'menu__list-item': mobile,
        },
        className,
      )}
      dangerouslySetInnerHTML={{__html: value}}
    />
  );
};

export default HtmlNavbarItem;
