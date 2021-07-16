import React, { ReactNode } from 'react';
import Page from '../../Page';
import { useAuth } from './Auth';

interface Props {
  children?: ReactNode;
}
const AuthorizedPage = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Page title="You do not have access to this page">{null}</Page>;
};

export default AuthorizedPage;
