import DefaultNavbarItem from 'theme-classic/NavbarItem/DefaultNavbarItem';
// import DocNavbarItem from 'theme-classic/NavbarItem/DocNavbarItem';

const NavbarItemComponents = {
  default: () => DefaultNavbarItem,
  doc: () => DefaultNavbarItem,
  // doc: () => require('theme-classic/NavbarItem/DocNavbarItem').default,
};

const getNavbarItemComponent = (type = 'default') => {
  const navbarItemComponent = NavbarItemComponents[type];
  if (!navbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }

  return navbarItemComponent();
};

const NavbarItem = ({ type, ...props }) => {
  const NavbarItemComponent = getNavbarItemComponent(type);

  return (
    <NavbarItemComponent {...props} />
  );
};

export default NavbarItem;