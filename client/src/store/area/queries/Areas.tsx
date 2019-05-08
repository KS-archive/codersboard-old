import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

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

export const withAreas = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={AREAS}>
    {({ data }) => <WrapperComponent {...props} areas={data.areas} />}
  </Query>
);

export default (props: Props) => <Query<Data, {}> query={AREAS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface AreaProps {
  id: string;
  areaURL: string;
  name: string;
  image: string;
  description: string;
  color: string;
}

export interface Data {
  areas: AreaProps[];
}
