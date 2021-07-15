/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
