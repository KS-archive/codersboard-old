import gql from 'graphql-tag';
import { apollo } from 'utils';
import { ISuccessValues } from '../SuccessModal';
import { SUCCESSES } from '../store/withSuccesses';

const CREATE_SUCCESS = gql`
  mutation createSuccess($data: SuccessCreateInput!) {
    createSuccess(data: $data) {
      id
    }
  }
`;

interface ICreateSuccessResponse {
  createSuccess: {
    id: string;
  };
}

export default async (variables: ISuccessValues) => {
  const data = {
    ...variables,
    users: {
      connect: variables.users.map(id => ({ id })),
    },
    project: { connect: { id: variables.project } },
  };

  const response: ICreateSuccessResponse = await apollo.mutate({
    mutation: CREATE_SUCCESS,
    variables: { data },
    refetchQueries: [{ query: SUCCESSES }],
  });

  return response;
};
