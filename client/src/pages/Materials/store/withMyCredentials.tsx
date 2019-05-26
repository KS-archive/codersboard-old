import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

export interface ICredential {
  id?: string;
  name: string;
  login: string;
  password: string;
}

interface IData {
  me: {
    id: string;
    credentials?: ICredential[];
  };
}

export interface IWithMyCredentials {
  myCredentials: ICredential[];
  myCredentialsLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={MY_CREDENTIALS}>{({ data, error, loading }) => {
    const myCredentials = (data.me && data.me.credentials) ? data.me.credentials : [];
    return <WrapperComponent {...props} myCredentials={myCredentials} myCredentialsLoading={loading} />;
  }}</Query>
);
