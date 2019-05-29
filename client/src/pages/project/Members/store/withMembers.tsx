import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const MEMBERS = gql`
  query project($url: String!) {
    project(where: { url: $url }) {
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
  project: {
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

export default (WrapperComponent: any) => (props: RouteComponentProps<{ projectURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={MEMBERS} variables={{ url: props.match.params.projectURL }}>
    {({ data, loading }) => (
      <WrapperComponent {...props} members={data.project && data.project.members} membersLoading={loading} />
    )}
  </Query>
);
