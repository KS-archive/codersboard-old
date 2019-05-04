import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import client from 'store/client';
import { ME } from '../queries/Me';

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      message
    }
  }
`;

export default (props: Props) => <Mutation<Data, {}> mutation={SIGN_OUT}>{props.children}</Mutation>;

export const signOut = async () => {
  try {
    const data = await client.mutate({
      mutation: SIGN_OUT,
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
  signOut: {
    message: string;
  };
}
