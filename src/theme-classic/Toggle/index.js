import { useState, useRef, memo } from 'react';
import clsx from 'clsx';

import { useThemeConfig } from 'theme-classic/useThemeConfig';
import useDocusaurusContext from '@docusaurus/core/lib/client/exports/useDocusaurusContext';

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

const Toggle = memo(({
  className,
  icons,
  checked: defaultChecked,
  disabled,
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

const ToggleWrapper = (props) => {
  const {
    colorMode: {
      switchConfig: { darkIcon, darkIconStyle, lightIcon, lightIconStyle },
    },
  } = useThemeConfig();
  const { isClient } = useDocusaurusContext();

  return (
    <Toggle
      disabled={!isClient}
      icons={{
        checked: <Dark icon={darkIcon} style={darkIconStyle} />,
        unchecked: <Light icon={lightIcon} style={lightIconStyle} />,
      }}
      {...props}
    />
  );
};

export default ToggleWrapper;
