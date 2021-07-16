import { OktaAuthOptions } from '@okta/okta-auth-js';

export const server = 'https://localhost:44382';
export const webAPIUrl = `${server}/api`;

export const oktaAuthOptions: OktaAuthOptions = {
  clientId: '0oa155ila6lXHAAyG5d7',
  issuer: 'https://dev-6717273.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/signin/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};
