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

export interface IUser {
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

export interface IData {
  users: IUser[];
}

interface IProps {
  children: (data: QueryResult<IData>) => React.ReactElement;
}

export default (props: IProps) => <Query<IData, {}> query={USERS}>{props.children}</Query>;
