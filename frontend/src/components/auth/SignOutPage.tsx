import React from 'react';
import Page from '../../Page';
import { StatusText } from '../../Styles';
import { useAuth } from './Auth';

type SignOutAction = 'signout' | 'signout-callback';
interface Props {
  action: SignOutAction;
}

const SignOutPage = ({ action }: Props) => {
  let message = 'Signing Out...';

  const { signOut } = useAuth();

  switch (action) {
    case 'signout':
      signOut();
      break;
    case 'signout-callback':
      message = 'You successfully signed out!';
      break;
    default:
      signOut();
      break;
  }

  return (
    <Page title="Sign Out">
      <StatusText>{message}</StatusText>
    </Page>
  );
};

export default SignOutPage;
