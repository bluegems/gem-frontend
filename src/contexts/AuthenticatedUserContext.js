import { createContext } from 'react';

const AuthenticatedUserContext = createContext({
  authenticatedUserInfo: null,
  setAuthenticatedUserInfo: () => {},
});

export default AuthenticatedUserContext;
