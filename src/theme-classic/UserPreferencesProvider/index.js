import UserPreferencesContext from 'theme-classic/UserPreferencesContext';

const UserPreferencesProvider = ({ children }) => {
  return (
    <UserPreferencesContext.Provider
      value={{
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
