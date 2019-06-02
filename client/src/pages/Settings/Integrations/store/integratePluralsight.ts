import gql from 'graphql-tag';
import { apollo } from 'utils';
import { ME } from './withIntegrations';

export const INTEGRATE_PLURALSIGHT = gql`
  mutation integratePluralsight($key: String!) {
    integratePluralsight(key: $key) {
      message
    }
  }
`;

interface IIntegratePluralsightResponse {
  integratePluralsight: {
    message?: string;
  };
}

export interface IIntegratePluralsightValues {
  key: string;
}

export default async (variables: IIntegratePluralsightValues) => {
  const data: IIntegratePluralsightResponse = await apollo.mutate({
    mutation: INTEGRATE_PLURALSIGHT,
    variables,
    refetchQueries: [{ query: ME }],
  });

  return data;
};
