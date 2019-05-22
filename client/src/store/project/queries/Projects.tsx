import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

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

export const withProjects = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={PROJECTS}>
    {({ data }) => <WrapperComponent {...props} projects={data.projects} />}
  </Query>
);

export default (props: Props) => <Query<Data, {}> query={PROJECTS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface ProjectProps {
  id: string;
  name: string;
  description: string;
  projectURL: string;
  image: string;
  type: string;
  status: string;
  color: string;
}

export interface Data {
  projects: ProjectProps[];
}
