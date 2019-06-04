import gql from 'graphql-tag';
import { apollo } from 'utils';
import { EVENTS } from './withEvents';

const NEGLECT_EVENT = gql`
  mutation neglectEvent($attendeeId: String!, $eventId: String!) {
    neglectEvent(attendeeId: $attendeeId, eventId: $eventId) {
      message
    }
  }
`;

interface INeglectEventResponse {
  neglectEvent: {
    message?: string;
  };
}

export default async (attendeeId: string, eventId: string) => {
  const data: INeglectEventResponse = await apollo.mutate({
    mutation: NEGLECT_EVENT,
    variables: { attendeeId, eventId },
    refetchQueries: [{ query: EVENTS }],
  });

  return data;
};
