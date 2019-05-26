import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

interface IUser {
  id: string;
};

export interface IUniversity {
  id: string;
  name: string;
  image: string;
  users: IUser[];
}

interface IData {
  universities: IUniversity[];
}

export interface IWithUniversities extends IData {
  universitiesLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={UNIVERSITIES}>
    {({ data, loading }) => (
      <WrapperComponent {...props} universities={data.universities} universitiesLoading={loading} />
    )}
  </Query>
);
