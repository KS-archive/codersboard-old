import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const MEMBERS = gql`
  query area($url: String!) {
    area(where: { url: $url }) {
      id
      members {
        id
        role
        responsibilities
        permissions
        user {
          id
          profileURL
          fullName
          image
        }
      }
    }
  }
`;

export type PermissionType = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';

export interface IMember {
  id: string;
  role: string;
  responsibilities: string;
  permissions: PermissionType;
  user: {
    id: string;
    profileURL: string;
    fullName: string;
    image: string;
  };
}

interface IData {
  area: {
    id: string;
    members: IMember[];
  };
}

export interface IWithMembers {
  members?: IMember[];
  membersLoading: boolean;
}

interface IQueryVaraibles {
  url: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={MEMBERS} variables={{ url: props.match.params.areaURL }}>
    {({ data, loading }) => (
      <WrapperComponent {...props} members={data.area && data.area.members} membersLoading={loading} />
    )}
  </Query>
);
