import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

const MATERIALS = gql`
  query materails($areaURL: String) {
    materials(where: { area: { areaURL: $areaURL } }) {
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

export interface IWithMaterials {
  materials: IMaterial[];
  materialsLoading: boolean;
}

interface IQueryVaraibles {
  areaURL?: string;
}

type Tag = {
  name: string;
  color: string;
};

export default (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL: string }>) => (
  <Query<IWithMaterials, IQueryVaraibles> query={MATERIALS} variables={{ areaURL: props.match.params.areaURL }}>
    {({ data, loading }) => <WrapperComponent {...props} materials={data.materials} materialsLoading={loading} />}
  </Query>
);
