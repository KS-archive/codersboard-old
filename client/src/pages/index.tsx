import React, { useEffect } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Spin } from 'antd';

import { apollo } from 'utils';
import AppWrapper from 'pages/AppWrapper';
import SignIn from 'pages/SignIn';
import Successes from 'pages/Successes';
import Materials from 'pages/Materials';
import Events from 'pages/Events';
import Settings from 'pages/Settings';

import Projects from 'pages/project/Projects';
import ProjectWrapper from 'pages/project/Wrapper';
import ProjectMembers from 'pages/project/Members';
import ProjectPosts from 'components/Posts/ProjectPosts';

import Members from 'pages/member/Members';
import Member from 'pages/member/Member';

import Areas from 'pages/area/Areas';
import AreaWrapper from 'pages/area/Wrapper';
import AreaPosts from 'components/Posts/AreaPosts';
import AreaMembers from 'pages/area/Members';

import AdminWrapper from 'pages/admin/Wrapper';
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
                      <Route exact path="/members/:profileURL" component={Member} />
                      <Route exact path="/areas" component={Areas} />
                      <Route path="/areas/:areaURL">
                        <AreaWrapper>
                          <Switch>
                            <Route exact path="/areas/:areaURL/news" component={AreaPosts} />
                            <Route exact path="/areas/:areaURL/members" component={AreaMembers} />
                            <Route exact path="/areas/:areaURL/materials" component={Materials} />
                          </Switch>
                        </AreaWrapper>
                      </Route>
                      <Route exact path="/projects" component={Projects} />
                      <Route path="/projects/:projectURL">
                        <ProjectWrapper>
                          <Switch>
                            <Route exact path="/projects/:projectURL/news" component={ProjectPosts} />
                            <Route exact path="/projects/:projectURL/members" component={ProjectMembers} />
                            <Route exact path="/projects/:projectURL/materials" component={Materials} />
                          </Switch>
                        </ProjectWrapper>
                      </Route>
                      <Route exact path="/successes" component={Successes} />
                      <Route exact path="/events" component={Events} />
                      <Route exact path="/materials" component={Materials} />
                      <Route path="/settings/:profileURL" component={Settings} />
                      <Route path="/admin">
                        <AdminWrapper>
                          <Switch>
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
