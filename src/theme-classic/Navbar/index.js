import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { useThemeConfig } from 'theme-common';
import useThemeContext from 'theme-classic/hooks/useThemeContext';
import useHideableNavbar from 'theme-classic/hooks/useHideableNavbar';
import useLockBodyScroll from 'theme-classic/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from 'theme-classic/hooks/useWindowSize';

import Logo from 'theme-classic/Logo';
import Toggle from 'theme-classic/Toggle';
import NavbarItem from 'theme-classic/NavbarItem';
import IconMenu from 'theme-classic/IconMenu';

import './styles.css';

const DefaultNavItemPosition = 'right';

const splitNavItemsByPosition = (items) => {
  const leftItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'left',
  );
  const rightItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'right',
  );
  const customItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'custom',
  );

  return {
    leftItems,
    rightItems,
    customItems,
  };
};

const Navbar = () => {
  const {
    navbar: {
      items,
      hideOnScroll,
      style,
    },
    colorMode: {
      disableSwitch: disableColorModeSwitch
    },
  } = useThemeConfig();

  const [ sidebarShown, setSidebarShown ] = useState(false);
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  useLockBodyScroll(sidebarShown);

  const showSidebar = useCallback(() => {
    setSidebarShown(true);
  }, [setSidebarShown]);

  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
  }, [setSidebarShown]);

  const onToggleChange = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme],
  );

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false);
    }
  }, [windowSize]);

  // const hasSearchNavbarItem = items.some((item) => item.type === 'search');
  const { leftItems, rightItems, customItems } = splitNavItemsByPosition(items);

  return (
    <nav
      ref={navbarRef}
      className={
        clsx('navbar', 'navbar--fixed-top', {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': sidebarShown,
          'navbarHideable': hideOnScroll,
          'navbarHidden': hideOnScroll && !isNavbarVisible,
        })
      }
    >
      <div className="navbar__inner">
        <div className="navbar__items">
          {
            items != null && items.length !== 0 && (
              <button
                aria-label="Navigation bar toggle"
                className="navbar__toggle clean-btn"
                type="button"
                tabIndex={0}
                onClick={showSidebar}
                onKeyDown={showSidebar}
              >
                <IconMenu />
              </button>
            )
          }
          <Logo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
            onClick={hideSidebar}
          />
          {
            leftItems.map((item, i) => (
              <NavbarItem {...item} key={i} />
            ))
          }
        </div>
        <div className="navbar__items navbar__items--right">
          {
            rightItems.map((item, i) => (
              <NavbarItem {...item} key={i} />
            ))
          }
          {!disableColorModeSwitch && (
            <Toggle
              className={'displayOnlyInLargeViewport'}
              checked={isDarkTheme}
              onChange={onToggleChange}
            />
          )}
          {
            customItems.map((item, i) => (
              <NavbarItem {...item} key={i} className={'displayOnlyInLargeViewport'} />
            ))
          }
        </div>
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <Logo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
            onClick={hideSidebar}
          />
          {!disableColorModeSwitch && sidebarShown && (
            <Toggle checked={isDarkTheme} onChange={onToggleChange} />
          )}
          {
            customItems.map((item, i) => (
              <NavbarItem {...item} key={i} />
            ))
          }
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.filter((item) => ["left", "right"].includes(item.position)).map((item, i) => (
                <NavbarItem
                  mobile
                  {...(item)} // TODO fix typing
                  onClick={hideSidebar}
                  key={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
