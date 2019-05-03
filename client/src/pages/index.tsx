import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from 'styled-components';

import Dashboard from 'pages/Dashboard';
import SignIn from 'pages/SignIn';

import GlobalStyle from 'styles/GlobalStyle';
import lightTheme from 'styles/lightTheme';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_ROOT_URL,
  credentials: 'include',
});

const App = () => (
  <>
  <GlobalStyle theme={lightTheme} />
  <ApolloProvider client={client}>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
  </>
);

export default App;
