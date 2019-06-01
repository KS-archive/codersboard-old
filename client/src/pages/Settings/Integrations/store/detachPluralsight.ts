import gql from 'graphql-tag';
import { apollo } from 'utils';
import { ME } from './withIntegrations';

export const DETACH_PLURALSIGHT = gql`
  mutation detachPluralsight {
    detachPluralsight {
      message
    }
  }
`;

interface IDetachCodewarsResponse {
  detachPluralsight: {
    message?: string;
  };
}

export default async () => {
  const data: IDetachCodewarsResponse = await apollo.mutate({
    mutation: DETACH_PLURALSIGHT,
    refetchQueries: [{ query: ME }],
  });

  return data;
};
