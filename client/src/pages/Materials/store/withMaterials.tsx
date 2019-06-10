import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const MATERIALS = gql`
  query materails($url: String) {
    materials(where: { OR: [{ area: { url: $url } }, { project: { url: $url } }] }) {
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
  id: string;
  name: string;
  color: string;
}

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
  url?: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL?: string; projectURL: string }>) => (
  <Query<IData, IQueryVaraibles>
    query={MATERIALS}
    variables={{ url: props.match.params.areaURL || props.match.params.projectURL }}
  >
    {({ data, loading }) => <WrapperComponent {...props} materials={data.materials} materialsLoading={loading} />}
  </Query>
);
