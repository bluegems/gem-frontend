// React
import React from 'react';
import ReactDOM from 'react-dom';
// 3rd party library
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import Cookies from 'universal-cookie';
// Custom
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GEM_AUTHORIZATION_TOKEN_COOKIE, GEM_GRAPHQL_URI } from './utils/Constants';

const cookies = new Cookies();

// Apollo
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
  mutate: {
    fetchPolicy: 'no-cache',
  },
};
const httpLink = new HttpLink({ uri: GEM_GRAPHQL_URI });
const authorizationMiddleware = new ApolloLink((operation, forward) => {
  const token = cookies.get(GEM_AUTHORIZATION_TOKEN_COOKIE);
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  return forward(operation);
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authorizationMiddleware, httpLink),
  defaultOptions,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
