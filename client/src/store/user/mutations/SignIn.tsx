import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import client from 'store/client';
import { ME } from '../queries/Me';

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export default (props: Props) => <Mutation<Data, Variables> mutation={SIGN_IN}>{props.children}</Mutation>;

export const signIn = async (variables: Variables) => {
  try {
    const data = await client.mutate({
      mutation: SIGN_IN,
      variables,
      refetchQueries: [{ query: ME }],
    });
    return data;
  } catch (ex) {
    return ex;
  }
};

interface Props {
  children: (data: any) => React.ReactElement;
}

interface Data {
  signIn: {
    id: string;
  };
}

interface Variables {
  email: string;
  password: string;
}
