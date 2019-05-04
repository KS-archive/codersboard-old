import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { Spin } from 'antd';

import client from 'store/client';
import MeQuery from 'store/user/queries/Me';
import AppWrapper from 'pages/AppWrapper';
import SignIn from 'pages/SignIn';
import Members from 'pages/Members';

import GlobalStyle from 'styles/GlobalStyle';
import lightTheme from 'styles/lightTheme';

const App = (props: Props) => {
  const {
    location: { pathname },
    history: { push },
  } = props;

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={lightTheme}>
          <MeQuery>
            {({ data: { me }, loading }) => {
              if (loading) return <Spin size="large" tip="Trwa ładowanie..." />;
              if (!me && pathname !== '/sign-in') push('/sign-in');
              if (me && pathname === '/sign-in') push('/');

              return (
                <Switch>
                  <Route path="/sign-in" component={SignIn} />
                  <AppWrapper>
                    <Switch>
                      <Route exact path="/members" component={Members} />
                      <Route exact path="/areas" component={() => <div>Obszary</div>} />
                      <Route exact path="/projects" component={() => <div>Projekty</div>} />
                      <Route exact path="/successes" component={() => <div>Sukcesy</div>} />
                      <Route exact path="/events" component={() => <div>Wydarzenia</div>} />
                      <Route exact path="/stats" component={() => <div>Statystyki</div>} />
                    </Switch>
                  </AppWrapper>
                </Switch>
              );
            }}
          </MeQuery>
        </ThemeProvider>
      </ApolloProvider>
      <GlobalStyle theme={lightTheme} />
    </>
  );
};

type Props = RouteComponentProps;

export default withRouter(App);
