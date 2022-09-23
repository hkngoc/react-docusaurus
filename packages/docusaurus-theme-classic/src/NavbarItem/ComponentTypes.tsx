/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DefaultNavbarItem from './DefaultNavbarItem';
import DropdownNavbarItem from './DropdownNavbarItem';
// import LocaleDropdownNavbarItem from './LocaleDropdownNavbarItem';
import HtmlNavbarItem from './HtmlNavbarItem';
import DocNavbarItem from './DocNavbarItem';
import DocSidebarNavbarItem from './DocSidebarNavbarItem';
import DocsVersionNavbarItem from './DocsVersionNavbarItem';


const ComponentTypes = {
  default: DefaultNavbarItem,
  // localeDropdown: LocaleDropdownNavbarItem,
  // search: SearchNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  // docsVersionDropdown: DocsVersionDropdownNavbarItem,
};

export default ComponentTypes;
