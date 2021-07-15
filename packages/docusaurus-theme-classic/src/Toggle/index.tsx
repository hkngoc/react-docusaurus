/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, memo } from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';
import { useThemeConfig } from '..//hooks/useThemeConfig';

import './styles.css';

const Dark = ({icon, style}) => (
  <span className={clsx('toggle', 'dark')} style={style}>
    {icon}
  </span>
);

const Light = ({icon, style}) => (
  <span className={clsx('toggle', 'light')} style={style}>
    {icon}
  </span>
);

const ToggleComponent = memo(({
  //@ts-ignore
  className,
  //@ts-ignore
  icons,
  //@ts-ignore
  checked: defaultChecked,
  //@ts-ignore
  disabled,
  //@ts-ignore
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div
      className={clsx('react-toggle', className, {
        'react-toggle--checked': checked,
        'react-toggle--focus': focused,
        'react-toggle--disabled': disabled,
      })}
    >
      <div
        className="react-toggle-track"
        role="button"
        tabIndex={-1}
        //@ts-ignore
        onClick={() => inputRef.current?.click()}>
        <div className="react-toggle-track-check">{icons.checked}</div>
        <div className="react-toggle-track-x">{icons.unchecked}</div>
        <div className="react-toggle-thumb" />
      </div>

      <input
        ref={inputRef}
        checked={checked}
        type="checkbox"
        className="react-toggle-screenreader-only"
        aria-label="Switch between dark and light mode"
        onChange={onChange}
        onClick={() => setChecked(!checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
});

export const Toggle = (props) => {
  const {
    colorMode: {
      switchConfig: { darkIcon, darkIconStyle, lightIcon, lightIconStyle },
    },
  } = useThemeConfig();
  const { isClient } = useDocusaurusContext();

  return (
    <ToggleComponent
      disabled={!isClient}
      icons={{
        checked: <Dark icon={darkIcon} style={darkIconStyle} />,
        unchecked: <Light icon={lightIcon} style={lightIconStyle} />,
      }}
      {...props}
    />
  );
};

export default Toggle;
