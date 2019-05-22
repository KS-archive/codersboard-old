import React from 'react';
import { MeProps } from 'store/user/queries/Me';

const Account: React.FC<Props> = () => {
  return <div>Account</div>;
};

interface Props {
  me: MeProps;
}

export default Account;
