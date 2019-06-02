import gql from 'graphql-tag';
import { apollo } from 'utils';
import { MEMBERS } from '../store/withMembers';

const DELETE_MEMBER = gql`
  mutation deleteAreaMember($where: AreaMemberWhereUniqueInput!) {
    deleteAreaMember(where: $where) {
      id
    }
  }
`;

interface IDeleteMemberResponse {
  updateMember: {
    id: string;
  };
}

export default async (memberId: string) => {
  const url = /\/areas\/(.*)\//.exec(window.location.pathname)[1];
  const where = { id: memberId };

  const response: IDeleteMemberResponse = await apollo.mutate({
    mutation: DELETE_MEMBER,
    variables: { where },
    refetchQueries: [{ query: MEMBERS, variables: { url } }],
  });

  return response;
};
