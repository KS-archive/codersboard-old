import React from 'react';
import gql from 'graphql-tag';
import { apollo } from 'utils';
import { MATERIALS } from './withMaterials';

export const ADD_MATERIAL = gql`
  mutation ADD_MATERIAL($data: MaterialCreateInput!) {
    createMaterial(data: $data) {
      id
    }
  }
`;

export default async (variables: Variables) => {
  try {
    console.log(variables);
    const data = await apollo.mutate({
      mutation: ADD_MATERIAL,
      variables,
      refetchQueries: [{ query: MATERIALS }],
    });
    return data;
  } catch (ex) {
    return ex;
  }
};

interface Props {
  children: (data: any) => React.ReactElement;
  variables: any;
}

interface Data {
  ADD_POST: {
    id: string;
  };
}
interface Tag {
  id: string;
}

interface Variables {
  data: {
    title: string;
    description: string;
    image: string;
    url: string;
    tags: {
      connect: Tag[];
    };
    user: {
      connect: {
        id: string;
      };
    };
    credential: object;
  };
}
