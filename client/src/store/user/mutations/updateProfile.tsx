import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import client from 'store/client';
import { ME } from 'store/user/queries/Me';

export const UPDATE_PROFILE = gql`
  mutation updateProfile($data: UserUpdateInput!) {
    updateProfile(data: $data) {
      id
    }
  }
`;

export default (props: Props) => <Mutation<Data, Values> mutation={UPDATE_PROFILE}>{props.children}</Mutation>;

export const updateProfile = async (variables: Values) => {
  const university = variables.university ? { connect: { id: variables.university } } : undefined;
  const data = await client.mutate({
    mutation: UPDATE_PROFILE,
    variables: { data: { ...variables, university } },
    refetchQueries: [{ query: ME }],
  });
  return data;
};

interface Props {
  children: (data: any) => React.ReactElement;
}

interface Data {
  updateProfile: {
    id: string;
  };
}

interface Values {
  companyEmail: string;
  email: string;
  fieldOfStudy: string;
  fullName: string;
  image: string;
  indexNumber: number;
  phone: string;
  role: string;
  university: any;
  universityDepartment: string;
  year: number;
}
