import gql from 'graphql-tag';
import { apollo } from 'utils';

const ME = gql`
  {
    me {
      id
    }
  }
`;

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

interface ISignInResponse {
  signIn: {
    id: string;
  };
}

export interface ISignInVariables {
  email: string;
  password: string;
}

export default async (variables: ISignInVariables) => {
  const data: ISignInResponse = await apollo.mutate({
    mutation: SIGN_IN,
    variables,
    refetchQueries: [{ query: ME }],
  });
  return data;
};
