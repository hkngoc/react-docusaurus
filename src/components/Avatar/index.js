import clsx from 'clsx';

import { Logo } from 'components';

import './styles.css';

export const Avatar = ({ className }) => {
  return (
    <div
      className={clsx("avatar", className)}
      title={"avatar"}
    >
      <Logo width={24} height={24} />
    </div>
  )
};

export default Avatar;

