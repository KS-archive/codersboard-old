import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const MATERIAL_TAGS = gql`
  query MATERIAL_TAGS {
    materialTags {
      id
      name
      color
    }
  }
`;

export default (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={MATERIAL_TAGS}>
    {({ data }) => <WrapperComponent {...props} materialTags={data.materialTags} />}
  </Query>
);

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface MaterialTag {
  id: string;
  name: string;
  color: string;
}

export interface Data {
  materialTags: MaterialTag[];
}
