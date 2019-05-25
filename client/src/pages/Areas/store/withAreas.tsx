import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const AREAS = gql`
  {
    areas {
      id
      areaURL
      name
      image
      description
      color
    }
  }
`;

export interface IArea {
  id: string;
  areaURL: string;
  name: string;
  image: string;
  description: string;
  color: string;
}

interface IData {
  areas: IArea[];
}

export interface IWithAreas extends IData {
  areasLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={AREAS}>
    {({ data, loading }) => <WrapperComponent {...props} areas={data.areas} areasLoading={loading} />}
  </Query>
);
