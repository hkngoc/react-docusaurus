/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import {
  isRegexpStringMatch,
  useCollapsible,
  Collapsible,
} from '@react-docusaurus/theme-common';
import {isSamePath, useLocalPathname} from '@react-docusaurus/theme-common';
import NavbarNavLink from './NavbarNavLink';
import NavbarItem from './index';

const isItemActive = (
  item: any,
  localPathname: string,
): boolean => {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
};

const containsActiveItems = (
  items: [],
  localPathname: string,
): boolean => {
  return items.some((item) => isItemActive(item, localPathname));
};

const DropdownNavbarItemDesktop = ({
  items,
  position,
  className,
  onClick,
  ...props
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        !dropdownRef.current ||
        dropdownRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setShowDropdown(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
      })}
    >
      {/* @ts-ignore */}
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : '#'}
        className={clsx('navbar__link', className)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}>
        {props.children ?? props.label}
      </NavbarNavLink>
      <ul className="dropdown__menu">
        {items.map((childItemProps: any, i: number) => (
          <NavbarItem
            isDropdownItem
            onKeyDown={(e) => {
              if (i === items.length - 1 && e.key === 'Tab') {
                e.preventDefault();
                setShowDropdown(false);
                const nextNavbarItem = dropdownRef.current!.nextElementSibling;
                if (nextNavbarItem) {
                  const targetItem =
                    nextNavbarItem instanceof HTMLAnchorElement
                      ? nextNavbarItem
                      : // Next item is another dropdown; focus on the inner
                        // anchor element instead so there's outline
                        nextNavbarItem.querySelector('a')!;
                  targetItem.focus();
                }
              }
            }}
            activeClassName="dropdown__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
};

const DropdownNavbarItemMobile = ({
  items,
  className,
  position, // Need to destructure position from props so that it doesn't get passed on.
  onClick,
  ...props
}) => {
  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);

  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: () => !containsActive,
  });

  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);

  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}
    >
      {/* @ts-ignore */}
      <NavbarNavLink
        role="button"
        className={clsx(
          'menu__link menu__link--sublist menu__link--sublist-caret',
          className,
        )}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          toggleCollapsed();
        }}>
        {props.children ?? props.label}
      </NavbarNavLink>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps: any, i: number) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </Collapsible>
    </li>
  );
}

const DropdownNavbarItem = ({
  mobile = false,
  ...props
}): JSX.Element => {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;

  // @ts-ignore
  return <Comp {...props} />;
}

export default DropdownNavbarItem;
