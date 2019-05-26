import gql from 'graphql-tag';
import { apollo, omit } from 'utils';
import { IMemberValues } from '../MemberModal';
import { MEMBERS } from '../store/withMembers';

const UPDATE_MEMBER = gql`
  mutation updateProjectMember($data: ProjectMemberUpdateInput!, $where: ProjectMemberWhereUniqueInput!) {
    updateProjectMember(data: $data, where: $where) {
      id
    }
  }
`;

interface IUpdateMemberResponse {
  updateMember: {
    id: string;
  };
}

export default async (variables: IMemberValues) => {
  const projectURL = /\/projects\/(.*)\//.exec(window.location.pathname)[1];

  const data = {
    ...omit(variables, ['id', '__typename']),
    user: { connect: { id: variables.user } },
    project: { connect: { projectURL } },
  };
  const where = { id: variables.id };

  const response: IUpdateMemberResponse = await apollo.mutate({
    mutation: UPDATE_MEMBER,
    variables: { data, where },
    refetchQueries: [{ query: MEMBERS, variables: { projectURL } }],
  });

  return response;
};
