import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const PROJECTS = gql`
  {
    projects {
      id
      name
      description
      projectURL
      image
      type
      status
      color
    }
  }
`;

export interface IProject {
  id: string;
  name: string;
  description: string;
  projectURL: string;
  image: string;
  type: string;
  status: string;
  color: string;
}

interface IData {
  projects: IProject[];
}

export interface IWithProjects extends IData {
  projectsLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={PROJECTS}>
    {({ data, loading }) => <WrapperComponent {...props} projects={data.projects} projectsLoading={loading} />}
  </Query>
);
