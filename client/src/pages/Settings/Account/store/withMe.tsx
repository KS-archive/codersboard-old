import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const ME = gql`
  {
    me {
      id
      fullName
      profileURL
      image
      email
      companyEmail
      phone
      role
      university {
        id
        name
      }
      universityDepartment
      fieldOfStudy
      year
      indexNumber
    }
  }
`;

export interface IMe {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
  email: string;
  companyEmail?: string;
  phone?: string;
  role: string;
  university?: {
    id: string;
    name: string;
  };
  universityDepartment?: string;
  fieldOfStudy?: string;
  year?: number;
  indexNumber?: number;
}

interface IData {
  me: IMe;
}

export interface IWithMe extends IData {}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={ME}>{({ data }) => <WrapperComponent {...props} me={data.me} />}</Query>
);
