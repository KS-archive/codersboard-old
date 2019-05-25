import gql from 'graphql-tag';
import client from 'store/client';

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
  const data: ISignInResponse = await client.mutate({
    mutation: SIGN_IN,
    variables,
    refetchQueries: [{ query: ME }],
  });
  return data;
};
