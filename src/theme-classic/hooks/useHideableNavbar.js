import {
  // useState,
  useCallback,
  // useRef,
} from 'react';

const useHideableNavbar = (hideOnScroll) => {
  // const [isNavbarVisible, setIsNavbarVisible] = useState(hideOnScroll);
  // const [navbarHeight, setNavbarHeight] = useState(0);
  // const isFocusedAnchor = useRef(false);

  const navbarRef = useCallback((node) => {
    if (node !== null) {
      // setNavbarHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return {
    navbarRef,
    // isNavbarVisible,
  };
};

export default useHideableNavbar;
