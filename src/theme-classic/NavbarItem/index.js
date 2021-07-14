import DefaultNavbarItem from 'theme-classic/NavbarItem/DefaultNavbarItem';
// import DocNavbarItem from 'theme-classic/NavbarItem/DocNavbarItem';

const NavbarItemComponents = {
  default: () => DefaultNavbarItem,
  doc: () => DefaultNavbarItem,
  // doc: () => require('theme-classic/NavbarItem/DocNavbarItem').default,
};

const getNavbarItemComponent = (type = "default", { position, renderer }) => {
  if (position === "custom" && renderer) {
    return renderer;
  }

  const navbarItemComponent = NavbarItemComponents[type];

  if (!navbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }

  return navbarItemComponent();
};

const NavbarItem = ({ type, renderer, ...props }) => {
  const NavbarItemComponent = getNavbarItemComponent(type, { renderer, ...props });

  return (
    <NavbarItemComponent {...props} />
  );
};

export default NavbarItem;