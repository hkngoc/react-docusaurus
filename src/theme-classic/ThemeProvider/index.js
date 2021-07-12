import ThemeContext from 'theme-classic/ThemeContext';
import useTheme from 'theme-classic/hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <ThemeContext.Provider
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
