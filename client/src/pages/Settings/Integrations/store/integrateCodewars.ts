import gql from 'graphql-tag';
import { apollo } from 'utils';

const ME = gql`
  {
    me {
      id
      codewars {
        id
        name
        data
      }
    }
  }
`;

export const INTEGRATE_CODEWARS = gql`
  mutation integrateCodewars($name: String!) {
    integrateCodewars(name: $name) {
      message
    }
  }
`;

interface IIntegrateCodewarsResponse {
  integrateCodewars: {
    message?: string;
  };
}

export interface IIntegrateCodewarsValues {
  name: string;
}

export default async (variables: IIntegrateCodewarsValues) => {
  const data: IIntegrateCodewarsResponse = await apollo.mutate({
    mutation: INTEGRATE_CODEWARS,
    variables,
    refetchQueries: [{ query: ME }],
  });

  return data;
};
