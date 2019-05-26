import React, { useEffect } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Spin } from 'antd';

import { apollo } from 'utils';
import AppWrapper from 'pages/AppWrapper';
import SignIn from 'pages/SignIn';
import Members from 'pages/Members';
import Successes from 'pages/Successes';
import Materials from 'pages/Materials';
import Settings from 'pages/Settings';

import Projects from 'pages/project/Projects';
import ProjectWrapper from 'pages/project/Wrapper';
import ProjectMembers from 'pages/project/Members';

import Areas from 'pages/area/Areas';
import AreaWrapper from 'pages/area/Wrapper';

import AdminWrapper from 'pages/admin/Wrapper';
import AdminMembers from 'pages/admin/Members';
import AdminUniversities from 'pages/admin/Universities';
import AdminSkills from 'pages/admin/Skills';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import generateCssVariables from 'styles/generateCssVariables';

const ME = gql`
  {
    me {
      id
    }
  }
`;

const App: React.FC<RouteComponentProps> = ({ location: { pathname }, history: { push } }) => {
  useEffect(() => {
    generateCssVariables(theme);
  }, []);

  return (
    <>
      <ApolloProvider client={apollo}>
        <Query<IData, {}> query={ME}>
          {({ data: { me }, loading }) => {
            if (loading) return <Spin size="large" tip="Trwa ładowanie..." />;
            if (!me && pathname !== '/sign-in') push('/sign-in');
            if (me && pathname === '/sign-in') push('/');

            return (
              <Switch>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/">
                  <AppWrapper>
                    <Switch>
                      <Route exact path="/members" component={Members} />
                      <Route exact path="/areas" component={Areas} />
                      <Route path="/areas/:areaURL">
                        <AreaWrapper>
                          <Switch>
                            <Route exact path="/areas/:areaURL/news" component={() => <div>Aktualności</div>} />
                            <Route exact path="/areas/:areaURL/members" component={() => <div>Członkowie</div>} />
                            <Route exact path="/areas/:areaURL/materials" component={Materials} />
                          </Switch>
                        </AreaWrapper>
                      </Route>
                      <Route exact path="/projects" component={Projects} />
                      <Route path="/projects/:projectURL">
                        <ProjectWrapper>
                          <Switch>
                            <Route exact path="/projects/:projectURL/news" component={() => <div>Aktualności</div>} />
                            <Route exact path="/projects/:projectURL/members" component={ProjectMembers} />
                            <Route exact path="/projects/:projectURL/materials" component={() => <div>Materiały</div>} />
                          </Switch>
                        </ProjectWrapper>
                      </Route>
                      <Route exact path="/successes" component={Successes} />
                      <Route exact path="/events" component={() => <div>Wydarzenia</div>} />
                      <Route exact path="/materials" component={Materials} />
                      <Route exact path="/stats" component={() => <div>Statystyki</div>} />
                      <Route path="/settings/:profileURL" component={Settings} />
                      <Route path="/admin">
                        <AdminWrapper>
                          <Switch>
                            <Route exact path="/admin/members" component={AdminMembers} />
                            <Route exact path="/admin/universities" component={AdminUniversities} />
                            <Route exact path="/admin/skills" component={AdminSkills} />
                          </Switch>
                        </AdminWrapper>
                      </Route>
                    </Switch>
                  </AppWrapper>
                </Route>
              </Switch>
            );
          }}
        </Query>
      </ApolloProvider>
      <GlobalStyle />
    </>
  );
};

interface IData {
  me: {
    id: string;
  };
}

export default withRouter(App);
