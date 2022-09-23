/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useDocsVersionCandidates } from '@react-docusaurus/theme-common';
import DefaultNavbarItem from './DefaultNavbarItem';

const getVersionMainDoc = (version) => version.docs.find((doc) => doc.id === version.mainDocId)!;

const DocsVersionNavbarItem = ({
  label: staticLabel,
  to: staticTo,
  docsPluginId,
  ...props
}): JSX.Element => {
  const version = useDocsVersionCandidates(docsPluginId)[0];
  const label = staticLabel ?? version.label;
  const path = staticTo ?? getVersionMainDoc(version).path;

  return (
    // @ts-ignore
    <DefaultNavbarItem
      {...props}
      label={label}
      to={path}
    />
  );
};

export default DocsVersionNavbarItem;
