import gql from 'graphql-tag';
import { apollo } from 'utils';

const ME = gql`
  {
    me {
      id
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      message
    }
  }
`;

interface ISignOutResponse {
  signOut: {
    message: string;
  };
}

export default async () => {
  const data: ISignOutResponse = await apollo.mutate({
    mutation: SIGN_OUT,
    refetchQueries: [{ query: ME }],
  });
  return data;
};
