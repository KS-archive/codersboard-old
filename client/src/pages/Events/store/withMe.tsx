import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const ME = gql`
  {
    me {
      id
    }
  }
`;

interface IData {
  me: {
    id: string;
    __typename: 'User';
  };
}

export interface IWithMe extends IData {}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={ME}>{({ data }) => <WrapperComponent {...props} me={data.me} />}</Query>
);
