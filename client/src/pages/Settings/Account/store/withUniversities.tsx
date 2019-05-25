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

interface IData {
  universities: IUniversityProps[];
}

export interface IWithUniversities extends IData {}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={UNIVERSITIES}>{({ data }) => <WrapperComponent {...props} universities={data.universities} />}</Query>
);
