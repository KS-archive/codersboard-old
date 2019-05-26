import gql from 'graphql-tag';
import { apollo } from 'utils';

const ME = gql`
  {
    me {
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($data: UserUpdateInput!) {
    updateProfile(data: $data) {
      id
    }
  }
`;

interface IUpdateProfileResponse {
  updateProfile: {
    id: string;
  };
}

export interface IUpdateProfileValues {
  companyEmail: string;
  email: string;
  fieldOfStudy: string;
  fullName: string;
  image: any;
  indexNumber: number;
  phone: string;
  role: string;
  university: any;
  universityDepartment: string;
  year: number;
}

export default async (variables: IUpdateProfileValues) => {
  const university = variables.university ? { connect: { id: variables.university } } : undefined;
  const data: IUpdateProfileResponse = await apollo.mutate({
    mutation: UPDATE_PROFILE,
    variables: { data: { ...variables, university } },
    refetchQueries: [{ query: ME }],
  });
  return data;
};
