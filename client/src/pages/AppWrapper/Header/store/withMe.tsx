import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MainPermission } from 'types/User';

export const ME = gql`
  {
    me {
      id
      fullName
      profileURL
      image
      permissions
    }
  }
`;

export interface IMe {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
  permissions: MainPermission[];
}

interface IData {
  me: IMe;
}

export interface IWithMe extends IData {}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={ME}>{({ data }) => <WrapperComponent {...props} me={data.me} />}</Query>
);
