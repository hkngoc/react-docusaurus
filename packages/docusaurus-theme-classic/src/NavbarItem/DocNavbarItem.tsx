/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/lib/client';
import { useLayoutDoc } from '@react-docusaurus/theme-common';
import DefaultNavbarItem from './DefaultNavbarItem';

const DocNavbarItem = ({
  docId,
  label: staticLabel,
  docsPluginId,
  ...props
}): JSX.Element | null => {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const doc = useLayoutDoc(docId, docsPluginId);

  // Draft items are not displayed in the navbar.
  if (doc === null) {
    return null;
  }

  return (
    // @ts-ignore
    <DefaultNavbarItem
      exact={true}
      {...props}
      isActive={() =>
        activeDoc?.path === doc.path ||
        (!!activeDoc?.sidebar && activeDoc.sidebar === doc.sidebar)
      }
      label={staticLabel ?? doc.id}
      to={doc.path}
    />
  );
}

export default DocNavbarItem;
