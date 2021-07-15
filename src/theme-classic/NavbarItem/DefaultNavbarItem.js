import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

import isInternalUrl from '@docusaurus/core/lib/client/exports/isInternalUrl';
import useBaseUrl from '@docusaurus/core/lib/client/exports/useBaseUrl';
import { useLocation } from '@docusaurus/core/lib/client/exports/router';
import { Link } from 'theme-classic/Link';
import { isSamePath } from '@docusaurus/theme-common/lib/utils/pathUtils';

import IconExternalLink from 'theme-classic/IconExternalLink';

const dropdownLinkActiveClass = "dropdown__link--active";

const NavLink = ({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  activeClassName = 'navbar__link--active',
  prependBaseUrlToHref,
  ...props
}) => {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const isExternalLink = label && href && !isInternalUrl(href);
  const isDropdownLink = activeClassName === dropdownLinkActiveClass;

  return (
    <Link
      {
        ...(
          href ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          } : {
            // isNavLink: true,
            activeClassName,
            to: toUrl,
            ...(
              activeBasePath || activeBaseRegex ? {
                isActive: (_match, location) => activeBaseRegex ? new RegExp(activeBaseRegex).test(location.pathname) : location.pathname.startsWith(activeBaseUrl)
              } : null
            ),
          }
        )
      }
      {...props}
    >
      {isExternalLink ? (
        <span>
          {label}
          <IconExternalLink {...(isDropdownLink && { width: 12, height: 12 })} />
        </span>
      ) : (
        label
      )}
    </Link>
  );
};

const NavItemMobile = ({ items, position, className, ...props }) => {
  const menuListRef = useRef(null);
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(
    () => !items?.some((item) => isSamePath(item.to, pathname)) ?? true,
  );

  const navLinkClassNames = (extraClassName, isSubList = false) => clsx(
    "menu__link",
    {
      "menu__link--sublist": isSubList,
    },
    extraClassName,
  );

  if (!items) {
    return (
      <li className="menu__list-item">
        <NavLink className={navLinkClassNames(className)} {...props} />
      </li>
    );
  }

  const menuListHeight = menuListRef.current?.scrollHeight
    ? `${menuListRef.current?.scrollHeight}px`
    : undefined;

  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}>
      <NavLink
        role="button"
        className={navLinkClassNames(className, true)}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          setCollapsed((state) => !state);
        }}>
        {props.children ?? props.label}
      </NavLink>
      <ul
        className="menu__list"
        ref={menuListRef}
        style={{
          height: !collapsed ? menuListHeight : undefined,
        }}>
        {items.map(({ className: childItemClassName, ...childItemProps }, i) => (
          <li className="menu__list-item" key={i}>
            <NavLink
              activeClassName="menu__link--active"
              className={navLinkClassNames(childItemClassName)}
              {...childItemProps}
              onClick={props.onClick}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

const NavItemDesktop = ({ items, position, className, ...props }) => {
  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const [ showDropdown, setShowDropdown ] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }

      setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownRef]);

  const navLinkClassNames = (extraClassName, isDropdownItem = false) => clsx({
      "navbar__item navbar__link": !isDropdownItem,
      dropdown__link: isDropdownItem,
    },
    extraClassName,
  );

  if (!items) {
    return <NavLink className={navLinkClassNames(className)} {...props} />;
  }

  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--left': position === 'left',
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
      })}
    >
      <NavLink
        className={navLinkClassNames(className)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}>
        {props.children ?? props.label}
      </NavLink>
      <ul ref={dropdownMenuRef} className="dropdown__menu">
        {
          items.map(({ className: childItemClassName, ...childItemProps }, i) => (
            <li key={i}>
              <NavLink
                onKeyDown={(e) => {
                  if (i === items.length - 1 && e.key === 'Tab') {
                    e.preventDefault();

                    setShowDropdown(false);

                    const nextNavbarItem = (dropdownRef.current)
                      .nextElementSibling;

                    if (nextNavbarItem) {
                      (nextNavbarItem).focus();
                    }
                  }
                }}
                activeClassName={dropdownLinkActiveClass}
                className={navLinkClassNames(childItemClassName, true)}
                {...childItemProps}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const DefaultNavbarItem = ({ mobile = false, ...props }) => {
  const Comp = mobile ? NavItemMobile : NavItemDesktop;

  return (
    <Comp {...props} />
  );
};

export default DefaultNavbarItem;
