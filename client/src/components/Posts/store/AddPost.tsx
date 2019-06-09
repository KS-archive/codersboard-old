import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { apollo } from 'utils';
import { AREA_POSTS, PROJECT_POSTS } from './withPosts';

export const ADD_POST = gql`
  mutation ADD_POST($data: PostCreateInput!) {
    createPost(data: $data) {
      id
    }
  }
`;

export default (props: Props) => (
  <Mutation<Data, Variables> mutation={ADD_POST} variables={props.variables}>
    {props.children}
  </Mutation>
);

export const addPostArea = async (variables: Variables, queryVariable: string) => {
  try {
    const data = await apollo.mutate({
      mutation: ADD_POST,
      variables,
      refetchQueries: [{ query: AREA_POSTS, variables: { areaURL: queryVariable } }],
    });
    return data;
  } catch (ex) {
    return ex;
  }
};

export const addPostProject = async (variables: Variables, queryVariable: string) => {
  try {
    const data = await apollo.mutate({
      mutation: ADD_POST,
      variables,
      refetchQueries: [{ query: PROJECT_POSTS, variables: { projectURL: queryVariable } }],
    });
    return data;
  } catch (ex) {
    return ex;
  }
};

interface Props {
  children: (data: any) => React.ReactElement;
  variables: any;
}

interface Data {
  ADD_POST: {
    id: string;
  };
}

interface Variables {
  data: {
    title: string;
    content: string;
    user: {
      connect: {
        id: string;
      };
    };
  };
}
