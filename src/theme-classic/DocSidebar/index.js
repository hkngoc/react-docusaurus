import { useState, useCallback, useEffect, useRef, memo } from 'react';
import clsx from 'clsx';

import { useThemeConfig } from 'theme-classic/hooks/useThemeConfig';
import { isSamePath } from '@docusaurus/theme-common/lib/utils/pathUtils';
import { usePrevious } from '@docusaurus/theme-common/lib/utils/usePrevious'

import useLockBodyScroll from 'theme-classic/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from 'theme-classic/hooks/useWindowSize';
import isInternalUrl from '@docusaurus/core/lib/client/exports/isInternalUrl';
import Link from '@docusaurus/core/lib/client/exports/Link';
// import applyTrailingSlash from '@docusaurus/core/lib/client/exports/applyTrailingSlash';
import { useLocation } from '@docusaurus/core/lib/client/exports/router';

import Logo from 'theme-classic/Logo';
import IconMenu from 'theme-classic/IconMenu';
import IconArrow from 'theme-classic/IconArrow';
import IconExternalLink from 'theme-classic/IconExternalLink';

import './styles.css';

const MOBILE_TOGGLE_SIZE = 24;

const isActiveSidebarItem = (item, activePath, sidebarName) => {
  if (item.type === "category") {
    return item.items.some((subItem) =>
    isActiveSidebarItem(subItem, activePath, sidebarName),
    );
  }

  return isSamePath(`/${sidebarName}/${item.href}`, activePath);
  // if (item.type === "link" || item.type === "doc") {
  //   return isSamePath(`/${sidebarName}/${item.href}`, activePath);
  // }

  // return false;
};

const DocSidebarItems = memo(({ items, ...props }) => {
  return items.map((item, index) => (
    <DocSidebarItem
      key={index} // sidebar is static, the index does not change
      item={item}
      {...props}
    />
  ));
});

const DocSidebarItem = (props) => {
  switch (props.item.type) {
    case "category":
      return <DocSidebarItemCategory {...props} />;
    case "link":
    default:
      return <DocSidebarItemLink {...props} />;
  }
};

const DocSidebarItemCategory = ({
  item,
  sidebarName,
  onItemClick,
  collapsible,
  activePath,
  ...props
}) => {
  const { items, label } = item;
  const isActive = isActiveSidebarItem(item, activePath, sidebarName);
  const wasActive = usePrevious(isActive);

  // active categories are always initialized as expanded
  // the default (item.collapsed) is only used for non-active categories
  const [collapsed, setCollapsed] = useState(() => {
    if (!collapsible) {
      return false;
    }
    return isActive ? false : item.collapsed;
  });

  const menuListRef = useRef(null);
  const [ menuListHeight, setMenuListHeight ] = useState(undefined);
  const handleMenuListHeight = (calc = true) => {
    setMenuListHeight(
      calc ? `${menuListRef.current?.scrollHeight}px` : undefined,
    );
  };

  // If we navigate to a category, it should automatically expand itself
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed]);

  const handleItemClick = useCallback(
    (e) => {
      e.preventDefault();

      if (!menuListHeight) {
        handleMenuListHeight();
      }

      setTimeout(() => setCollapsed((state) => !state), 100);
    },
    [menuListHeight],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <li
      className={clsx("menu__list-item", {
        "menu__list-item--collapsed": collapsed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={clsx("menu__link", {
          "menu__link--sublist": collapsible,
          "menu__link--active": collapsible && isActive,
          "menuLinkText": !collapsible,
        })}
        onClick={collapsible ? handleItemClick : undefined}
        href={collapsible ? '#' : undefined}
        {...props}>
        {label}
      </a>
      <ul
        className="menu__list"
        ref={menuListRef}
        style={{
          height: menuListHeight,
        }}
        onTransitionEnd={() => {
          if (!collapsed) {
            handleMenuListHeight(false);
          }
        }}>
        <DocSidebarItems
          items={items}
          sidebarName={sidebarName}
          tabIndex={collapsed ? '-1' : '0'}
          onItemClick={onItemClick}
          collapsible={collapsible}
          activePath={activePath}
        />
      </ul>
    </li>
  );
};

const DocSidebarItemLink = ({
  item,
  sidebarName,
  onItemClick,
  activePath,
  collapsible: _collapsible,
  ...props
}) => {
  const { href = "", label } = item;
  const isActive = isActiveSidebarItem(item, activePath, sidebarName);

  const mergedHref = `/${sidebarName}/${href}`;
  // console.log(mergedHref, activePath, isActive);

  return (
    <li className="menu__list-item" key={label}>
      <Link
        className={clsx("menu__link", {
          "menu__link--active": isActive,
        })}
        to={mergedHref}
        {...(isInternalUrl(mergedHref) && {
          isNavLink: true,
          exact: true,
          onClick: onItemClick,
        })}
        {...props}
      >
        {isInternalUrl(mergedHref) ? (
          label
        ) : (
          <span>
            {label}
            <IconExternalLink />
          </span>
        )}
      </Link>
    </li>
  );
};

const useResponsiveSidebar = () => {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  useLockBodyScroll(showResponsiveSidebar);

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setShowResponsiveSidebar(false);
    }
  }, [windowSize]);

  const closeResponsiveSidebar = useCallback(
    (e) => {
      e.target.blur();
      setShowResponsiveSidebar(false);
    },
    [setShowResponsiveSidebar],
  );

  const toggleResponsiveSidebar = useCallback(() => {
    setShowResponsiveSidebar((value) => !value);
  }, [setShowResponsiveSidebar]);

  return {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar,
  };
};

const HideableSidebarButton = ({ onClick }) => {
  return (
    <button
      type="button"
      title={"Collapse sidebar"}
      aria-label={"Collapse sidebar"}
      className={clsx(
        'button button--secondary button--outline',
        "collapseSidebarButton",
      )}
      onClick={onClick}
    >
      <IconArrow className={"collapseSidebarButtonIcon"} />
    </button>
  );
};

const ResponsiveSidebarButton = ({ responsiveSidebarOpened, onClick }) => {
  return (
    <button
      aria-label={
        responsiveSidebarOpened
          ? "Close menu"
          : "Open menu"
      }
      aria-haspopup="true"
      className="button button--secondary button--sm menu__button"
      type="button"
      onClick={onClick}>
      {responsiveSidebarOpened ? (
        <span
          className={clsx("sidebarMenuIcon", "sidebarMenuCloseIcon")}>
          &times;
        </span>
      ) : (
        <IconMenu
          className={"sidebarMenuIcon"}
          height={MOBILE_TOGGLE_SIZE}
          width={MOBILE_TOGGLE_SIZE}
        />
      )}
    </button>
  );
};

const DocSidebar = ({
  path,
  sidebar,
  sidebarName,
  sidebarCollapsible = true,
  onCollapse,
  isHidden,
}) => {
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();
  const { pathname } = useLocation();

  const {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar,
  } = useResponsiveSidebar();

  return (
    <div
      className={clsx("sidebar", {
        "sidebarWithHideableNavbar": hideOnScroll,
        "sidebarHidden": isHidden,
      })}
    >
      {
        hideOnScroll && (
          <Logo tabIndex={-1} className={"sidebarLogo"} />
        )
      }
      <nav
        className={clsx(
          "menu",
          "menu--responsive",
          "thin-scrollbar",
          "menu",
          {
            "menu--show": showResponsiveSidebar,
            // "menuWithAnnouncementBar": !isAnnouncementBarClosed && showAnnouncementBar,
          },
        )}
        aria-label={"Sidebar navigation"}
      >
        <ResponsiveSidebarButton
          responsiveSidebarOpened={showResponsiveSidebar}
          onClick={toggleResponsiveSidebar}
        />
        <ul className="menu__list">
          <DocSidebarItems
            items={sidebar}
            sidebarName={sidebarName}
            onItemClick={closeResponsiveSidebar}
            collapsible={sidebarCollapsible}
            activePath={pathname}
          />
        </ul>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
};

export default DocSidebar;
