import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const MATERIALS = gql`
  {
    materials {
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
        login
        password
      }
    }
  }
`;

export const withMaterials = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={MATERIALS}>{({ data }) => <WrapperComponent {...props} materials={data.materials} />}</Query>
);

export default (props: Props) => <Query<Data, {}> query={MATERIALS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export type Tag = {
  name: string;
  color: string;
};

export interface MaterialProps {
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
  materials: MaterialProps[];
}
