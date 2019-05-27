import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const MATERIALS = gql`
  query materails($areaURL: String) {
    materials(where: { area: { areaURL: $areaURL } }) {
      id
      title
      description
      image
      url
      tags {
        id
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

interface Tag {
  id: string
  name: string;
  color: string;
};

export interface IMaterial {
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

interface IData {
  materials: IMaterial[];
}

export interface IWithMaterials extends IData {
  materialsLoading: boolean;
}

interface IQueryVaraibles {
  areaURL?: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={MATERIALS} variables={{ areaURL: props.match.params.areaURL }}>
    {({ data, loading }) => <WrapperComponent {...props} materials={data.materials} materialsLoading={loading} />}
  </Query>
);
