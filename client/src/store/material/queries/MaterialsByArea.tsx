import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const MATERIALS_BY_AREA = gql`
  query MATERIALS_BY_AREA($area: String!) {
    materials(where: { tags_some: { name: $area } }) {
      id
      title
      description
      image
      url
      tags {
        name
        color
      }
      credential {
        id
        name
      }
    }
  }
`;

export const withMaterialsByArea = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={MATERIALS_BY_AREA} variables={props.variables}>
    {({ data }) => <WrapperComponent {...props} materials={data.materials} />}
  </Query>
);

export default (props: Props) => (
  <Query<Data, {}> query={MATERIALS_BY_AREA} variables={props.variables}>
    {props.children}
  </Query>
);

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
  variables: {
    area: string;
  };
}

export type Tag = {
  name: string;
  color: string;
};

export interface MaterialByAreaProps {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: Tag[];
  credential: {
    id: string;
    name: string;
  };
}

export interface Data {
  materials: MaterialByAreaProps[];
}
