import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const MY_CREDENTIALS = gql`
  {
    me {
      id
      credentials {
        id
        name
        login
        password
      }
    }
  }
`;

export const withMyCredentials = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={MY_CREDENTIALS}>{({ data, error, loading }) => {
    const myCredentials = (data.me && data.me.credentials) ? data.me.credentials : [];
    return <WrapperComponent {...props} myCredentials={myCredentials} myCredentialsLoading={loading} />;
  }}</Query>
);

export default (props: Props) => <Query<Data, {}> query={MY_CREDENTIALS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface CredentialsProps {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface Data {
  me: {
    id: string;
    credentials: CredentialsProps[];
  };
}
