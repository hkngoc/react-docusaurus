import {useContext} from 'react';
import ThemeContext from 'theme-classic/ThemeContext';

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default useThemeContext;
