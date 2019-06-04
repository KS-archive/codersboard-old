import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const PROJECTS = gql`
  {
    projects {
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
  projects: IProject[];
}

export interface IWithProjects extends IData {
  projectsLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={PROJECTS}>{({ data, loading }) => <WrapperComponent {...props} projects={data.projects} projectsLoading={loading} />}</Query>
);
