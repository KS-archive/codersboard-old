import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

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
        }
      }
      projects {
        id
        project {
          id
          name
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

export const withUsers = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={USERS}>{({ data }) => <WrapperComponent {...props} users={data.users} />}</Query>
);

export default (props: Props) => <Query<Data, {}> query={USERS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface User {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
  email: string;
  companyEmail: string;
  phone: string;
  role: string;
  areas: any;
  projects: any;
  university: {
    id: string;
    name: string;
    image: string;
  };
  universityDepartment: string;
  fieldOfStudy: string;
  year: number;
  indexNumber: number;
  institution: string[];
}

export interface Data {
  users: User[];
}
