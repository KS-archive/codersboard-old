import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const UNIVERSITIES = gql`
  {
    universities {
      id
      name
    }
  }
`;


export interface IUniversityProps {
  id: string;
  name: string;
}

export interface Data {
  universities: IUniversityProps[];
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={UNIVERSITIES}>{({ data }) => <WrapperComponent {...props} universities={data.universities} />}</Query>
);
