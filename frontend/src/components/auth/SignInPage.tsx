import React from 'react';
import Page from '../../Page';
import { StatusText } from '../../Styles';
import { useAuth } from './Auth';

type SignInAction = 'signin' | 'signin-callback';
interface Props {
  action: SignInAction;
}

const SignInPage = ({ action }: Props) => {
  const { signIn } = useAuth();
  if (action === 'signin') {
    signIn();
  }

  return (
    <Page title="Sign In">
      <StatusText>Signing in...</StatusText>
    </Page>
  );
};

export default SignInPage;
