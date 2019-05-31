import gql from 'graphql-tag';
import { apollo } from 'utils';
import { ME } from './withIntegrations';

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
