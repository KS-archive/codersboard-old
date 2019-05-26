import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

const PROJECT = gql`
  query project($projectURL: String!) {
    project(where: { projectURL: $projectURL }) {
      id
      name
      image
    }
  }
`;

export interface IProject {
  id: string;
  name: string;
  image: string;
}

interface IData {
  project: IProject;
}

export interface IWithProject extends IData {
  projectLoading: boolean;
}

interface IQueryVaraibles {
  projectURL: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ projectURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={PROJECT} variables={{ projectURL: props.match.params.projectURL }}>
    {({ data, loading }) => <WrapperComponent {...props} project={data.project} projectLoading={loading} />}
  </Query>
);
