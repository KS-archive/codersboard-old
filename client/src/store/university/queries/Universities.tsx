import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const UNIVERSITIES = gql`
  {
    universities {
      id
      name
      image
      users {
        id
      }
    }
  }
`;

export const withUniversities = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={UNIVERSITIES}>{({ data }) => <WrapperComponent {...props} universities={data.universities} />}</Query>
);

export default (props: Props) => <Query<Data, {}> query={UNIVERSITIES}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

type User = {
  id: string;
}

export interface UniversityProps {
  id: string;
  name: string;
  image: string;
  users: User[];
}

export interface Data {
  universities: UniversityProps[];
}
