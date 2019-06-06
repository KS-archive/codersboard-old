import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const USERS = gql`
  {
    users {
      id
      fullName
      image
    }
  }
`;


interface IUser {
  id: string;
  fullName: string;
  image: string;
}

interface IData {
  users: IUser[];
}

interface IProps {
  children: (result: QueryResult<IData, {}>) => React.ReactNode
}

const UsersQuery: React.FC<IProps> = ({ children }) => <Query query={USERS}>{children}</Query>;

export default UsersQuery;
