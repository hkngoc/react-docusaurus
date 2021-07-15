import { useState, useCallback, useEffect } from 'react';
import { useThemeConfig } from 'theme-classic/hooks/useThemeConfig';
import { createStorageSlot } from '@docusaurus/theme-common/lib/utils/storageUtils';
import ExecutionEnvironment from '@docusaurus/core/lib/client/exports/ExecutionEnvironment';

const ThemeStorage = createStorageSlot('theme');

const themes = {
  light: 'light',
  dark: 'dark',
};

const coerceToTheme = (theme) => {
  return theme === themes.dark ? themes.dark : themes.light;
};

const getInitialTheme = (defaultMode) => {
  if (!ExecutionEnvironment.canUseDOM) {
    return coerceToTheme(defaultMode);
  }

  return coerceToTheme(document.documentElement.getAttribute('data-theme'));
};

const storeTheme = (newTheme) => {
  createStorageSlot('theme').set(coerceToTheme(newTheme));
};

const useTheme = () => {
  const {
    colorMode: { defaultMode, disableSwitch, respectPrefersColorScheme },
  } = useThemeConfig();
  const [theme, setTheme] = useState(getInitialTheme(defaultMode));

  const setLightTheme = useCallback(() => {
    setTheme(themes.light);
    storeTheme(themes.light);
  }, []);
  const setDarkTheme = useCallback(() => {
    setTheme(themes.dark);
    storeTheme(themes.dark);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', coerceToTheme(theme));
  }, [theme]);

  useEffect(() => {
    if (disableSwitch) {
      return;
    }

    try {
      const storedTheme = ThemeStorage.get();
      if (storedTheme !== null) {
        setTheme(coerceToTheme(storedTheme));
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [setTheme]);

  useEffect(() => {
    if (disableSwitch && !respectPrefersColorScheme) {
      return;
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(({ matches }) => {
        setTheme(matches ? themes.dark : themes.light);
      });
      // eslint-disable-next-line
  }, []);

  return {
    isDarkTheme: theme === themes.dark,
    setLightTheme,
    setDarkTheme,
  };
};

export default useTheme;
