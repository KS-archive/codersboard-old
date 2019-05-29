import gql from 'graphql-tag';
import { apollo } from 'utils';
import { IMemberValues } from '../MemberModal';
import { MEMBERS } from '../store/withMembers';

const CREATE_MEMBER = gql`
  mutation createProjectMember($data: ProjectMemberCreateInput!) {
    createProjectMember(data: $data) {
      id
    }
  }
`;

interface ICreateMemberResponse {
  createMember: {
    id: string;
  };
}

export default async (variables: IMemberValues) => {
  const url = /\/projects\/(.*)\//.exec(window.location.pathname)[1];

  const data = {
    ...variables,
    user: { connect: { id: variables.user } },
    project: { connect: { url } },
  };

  const response: ICreateMemberResponse = await apollo.mutate({
    mutation: CREATE_MEMBER,
    variables: { data },
    refetchQueries: [{ query: MEMBERS, variables: { url } }],
  });

  return response;
};
