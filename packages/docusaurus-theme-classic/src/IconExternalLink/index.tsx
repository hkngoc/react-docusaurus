/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const IconExternalLink = ({ width = 13.5, height = 13.5, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="iconExternalLink"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
      />
    </svg>
  );
};

export default IconExternalLink;
