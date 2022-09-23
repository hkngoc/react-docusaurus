/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  memo,
} from 'react';
import clsx from 'clsx';

import { useIsBrowser } from '@react-docusaurus/core';

import IconLightMode from '../Icon/LightMode';
import IconDarkMode from '../Icon/DarkMode';

const ColorModeToggle = ({ className, value, onChange }) => {
  const isBrowser = useIsBrowser();

  return (
    <div className={clsx('toggle', className)}>
      <button
        className={clsx(
          'clean-btn',
          'toggleButton',
          !isBrowser && 'toggleButtonDisabled',
        )}
        type="button"
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
        disabled={!isBrowser}
        title={ `${value === 'dark' ? 'dark' : 'light'} mode`}
        aria-label={`The name for the ${value === 'dark' ? 'dark' : 'light'} color mode`}>
        <IconLightMode
          className={clsx('toggleIcon', 'lightToggleIcon')}
        />
        <IconDarkMode
          className={clsx('toggleIcon', 'darkToggleIcon')}
        />
      </button>
    </div>
  );
};

export default memo(ColorModeToggle);
