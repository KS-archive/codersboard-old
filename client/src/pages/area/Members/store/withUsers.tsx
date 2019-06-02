import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const USERS = gql`
  {
    users {
      id
      fullName
      image
    }
  }
`;


export interface IUser {
  id: string;
  fullName: string;
  image: string;
}

interface IData {
  users: IUser[];
}

export interface IWithUsers extends IData {
  usersLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={USERS}>{({ data, loading }) => <WrapperComponent {...props} users={data.users} usersLoading={loading} />}</Query>
);
