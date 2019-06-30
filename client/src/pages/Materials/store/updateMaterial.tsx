import gql from 'graphql-tag';
import { apollo } from 'utils';
import { MATERIALS } from './withMaterials';

export const UPDATE_MATERIAL = gql`
  mutation UPDATE_MATERIAL($data: MaterialUpdateInput!, $id: ID!) {
    updateMaterial(where: { id: $id }, data: $data) {
      id
    }
  }
`;

export default async (variables: Variables) => {
  try {
    const data = await apollo.mutate({
      mutation: UPDATE_MATERIAL,
      variables,
      refetchQueries: [{ query: MATERIALS }],
    });
    return data;
  } catch (ex) {
    return ex;
  }
};

interface Tag {
  id: string;
}

interface Variables {
  data: {
    project: {
      connect?: {
        url: string;
      };
      disconnect?: {
        url: string;
      };
    };
  };
  id: string;
}
