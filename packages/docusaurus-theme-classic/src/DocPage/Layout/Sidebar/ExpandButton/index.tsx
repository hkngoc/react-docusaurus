/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconArrow from '../../../../Icon/Arrow';

const DocPageLayoutSidebarExpandButton = ({ toggleSidebar }): JSX.Element => {
  return (
    <div
      className={'expandButton'}
      title={'Expand sidebar'}
      aria-label={'Expand sidebar'}
      tabIndex={0}
      role="button"
      onKeyDown={toggleSidebar}
      onClick={toggleSidebar}>
      <IconArrow className={'expandButtonIcon'} />
    </div>
  );
};

export default DocPageLayoutSidebarExpandButton;
