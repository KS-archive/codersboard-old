import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const PROJECTS = gql`
  {
    projects {
      id
      name
      image
    }
  }
`;


interface IProject {
  id: string;
  name: string;
  image: string;
}

interface IData {
  projects: IProject[];
}

interface IProps {
  children: (result: QueryResult<IData, {}>) => React.ReactNode
}

const ProjectsQuery: React.FC<IProps> = ({ children }) => <Query query={PROJECTS}>{children}</Query>;

export default ProjectsQuery;
