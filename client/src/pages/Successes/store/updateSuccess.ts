import gql from 'graphql-tag';
import { apollo, omit } from 'utils';
import { ISuccessValues } from '../SuccessModal';
import { SUCCESSES } from '../store/withSuccesses';

const UPDATE_SUCCESS = gql`
  mutation updateSuccess($data: SuccessUpdateInput!, $where: SuccessWhereUniqueInput!) {
    updateSuccess(data: $data, where: $where) {
      id
    }
  }
`;

interface IUpdateSuccessResponse {
  updateSuccess: {
    id: string;
  };
}

export default async (variables: ISuccessValues) => {
  const data = {
    ...omit(variables, ['id', '__typename', 'creator']),
    users: {
      connect: variables.users.map(id => ({ id })),
    },
    project: { connect: { id: variables.project } },
  };

  const where = { id: variables.id };

  const response: IUpdateSuccessResponse = await apollo.mutate({
    mutation: UPDATE_SUCCESS,
    variables: { data, where },
    refetchQueries: [{ query: SUCCESSES }],
  });

  return response;
};
