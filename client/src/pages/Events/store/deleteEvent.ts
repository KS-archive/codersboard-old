import gql from 'graphql-tag';
import { apollo } from 'utils';
import { EVENTS } from './withEvents';

const DELETE_EVENT = gql`
  mutation deleteEvent($where: EventWhereUniqueInput!) {
    deleteEvent(where: $where) {
      id
    }
  }
`;

interface IDeleteEventResponse {
  deleteEvent: {
    id: string;
  };
}

export default async (eventId: string) => {
  const response: IDeleteEventResponse = await apollo.mutate({
    mutation: DELETE_EVENT,
    variables: { where: { id: eventId } },
    refetchQueries: [{ query: EVENTS }],
  });

  return response;
};
