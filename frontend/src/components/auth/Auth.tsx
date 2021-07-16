import React, { createContext, useContext, useEffect, useState } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaAuthOptions } from '../../AppSettings';

interface User {
  name: string;
  email: string;
}

interface IUserContext {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
  signIn: () => void;
  signOut: () => void;
}

export const UserContext = createContext<IUserContext>({
  isAuthenticated: false,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

// This is a custom hook in React. Custom hooks are a mechanism for sharing
// logic in components. They allow the use of React components features such
// as useState, useEffect, useContext outside a component.
export const useAuth = () => useContext(UserContext);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [oktaClient, setOktaClient] = useState<OktaAuth | undefined>(undefined);

  const getOktaClientFromState = () => {
    if (oktaClient === undefined) {
      throw new Error('Okta client not set');
    }

    return oktaClient;
  };

  useEffect(() => {
    const initOkta = async () => {
      setLoading(true);
      const oktaAuth = new OktaAuth(oktaAuthOptions);
      setOktaClient(oktaAuth);

      if (
        window.location.pathname === '/signin/callback' &&
        window.location.search.indexOf('code=') > -1
      ) {
        await oktaAuth.handleLoginRedirect();
        window.location.replace(window.location.origin);
      }

      const isOktaAuthenticated = await oktaAuth.isAuthenticated();

      if (isOktaAuthenticated) {
        const oktaUser = await oktaAuth.getUser();
        const user: User = {
          name: oktaUser.name ?? '',
          email: oktaUser.email ?? '',
        };
        setIsAuthenticated(true);
        setUser(user);
      }

      setLoading(false);
    };
    initOkta();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        signIn: () => getOktaClientFromState().signInWithRedirect(),
        signOut: () => getOktaClientFromState().signOut(),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const getAccessToken = async () => {
  const oktaAuth = new OktaAuth(oktaAuthOptions);
  return oktaAuth.getAccessToken();
};
