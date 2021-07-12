import ThemeProvider from 'theme-classic/ThemeProvider';

const LayoutProviders = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default LayoutProviders;
