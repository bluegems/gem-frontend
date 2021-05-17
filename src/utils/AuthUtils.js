import Cookies from 'universal-cookie';

import { GEM_AUTHORIZATION_TOKEN_COOKIE } from './Constants';

const cookies = new Cookies();

export const isAuthenticated = () => {
  const token = cookies.get(GEM_AUTHORIZATION_TOKEN_COOKIE);
  return !!token && token.trim() !== '' && token.trim().split('.').length === 3;
};
