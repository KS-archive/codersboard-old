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

export const DETACH_CODEWARS = gql`
  mutation detachCodewars {
    detachCodewars {
      message
    }
  }
`;

interface IDetachCodewarsResponse {
  detachCodewars: {
    message?: string;
  };
}

export default async () => {
  const data: IDetachCodewarsResponse = await apollo.mutate({
    mutation: DETACH_CODEWARS,
    refetchQueries: [{ query: ME }],
  });

  return data;
};
