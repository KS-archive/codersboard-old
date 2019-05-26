import gql from 'graphql-tag';
import { apollo } from 'utils';
import { SUCCESSES } from '../store/withSuccesses';

const DELETE_SUCCESS = gql`
  mutation deleteSuccess($where: SuccessWhereUniqueInput!) {
    deleteSuccess(where: $where) {
      id
    }
  }
`;

interface IDeleteSuccessResponse {
  deleteSuccess: {
    id: string;
  };
}

export default async (successId: string) => {
  const response: IDeleteSuccessResponse = await apollo.mutate({
    mutation: DELETE_SUCCESS,
    variables: { where: { id: successId } },
    refetchQueries: [{ query: SUCCESSES }],
  });

  return response;
};
