import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const USERS = gql`
  {
    users {
      id
      fullName
      profileURL
      image
      email
      companyEmail
      phone
      role
      areas {
        id
        area {
          id
          name
          image
        }
      }
      projects {
        id
        project {
          id
          name
          image
        }
      }
      university {
        id
        name
        image
      }
      universityDepartment
      fieldOfStudy
      year
      indexNumber
      institution
    }
  }
`;

export interface IUser {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
  email: string;
  companyEmail: string;
  phone: string;
  role: string;
  areas: {
    id: string;
    area: {
      id: string;
      name: string;
      image: string;
      __typename: 'Area';
    },
    __typename: 'AreaMember';
  }[];
  projects: {
    id: string;
    project: {
      id: string;
      name: string;
      image: string;
      __typename: 'Project';
    },
    __typename: 'ProjectMember';
  }[];
  university: {
    id: string;
    name: string;
    image: string;
    __typename: 'University';
  };
  universityDepartment: string;
  fieldOfStudy: string;
  year: number;
  indexNumber: number;
  institution: string[];
  __typename: 'User';
}

export interface IWithUsers {
  users: IUser[];
}

interface IData {
  users: IUser[];
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={USERS}>
    {({ data }) => <WrapperComponent {...props} users={data.users} />}
  </Query>
);
