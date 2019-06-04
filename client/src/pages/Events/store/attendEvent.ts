import gql from 'graphql-tag';
import { apollo } from 'utils';
import { EVENTS } from './withEvents';

const ATTEND_EVENT = gql`
  mutation attendEvent($eventId: String!, $attendeeId: String) {
    attendEvent(eventId: $eventId, attendeeId: $attendeeId) {
      message
    }
  }
`;

interface IAttendEventResponse {
  attendEvent: {
    message?: string;
  };
}

export default async (eventId: string, attendeeId?: string) => {
  const data: IAttendEventResponse = await apollo.mutate({
    mutation: ATTEND_EVENT,
    variables: { attendeeId, eventId },
    refetchQueries: [{ query: EVENTS }],
  });

  return data;
};
