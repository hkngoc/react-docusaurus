/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import IconArrow from '../../../Icon/Arrow';

const CollapseButton = ({ onClick }): JSX.Element => {
  return (
    <button
      type="button"
      title={'Collapse sidebar'}
      aria-label={'Collapse sidebar'}
      className={clsx(
        'button button--secondary button--outline',
        'collapseSidebarButton',
      )}
      onClick={onClick}>
      <IconArrow className={'collapseSidebarButtonIcon'} />
    </button>
  );
}

export default CollapseButton;
