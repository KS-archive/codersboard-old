import gql from 'graphql-tag';
import { apollo } from 'utils';
import { EVENTS } from './withEvents';

const ATTEND_EVENT = gql`
  mutation attendEvent($attendeeId: String!, $eventId: String!) {
    attendEvent(attendeeId: $attendeeId, eventId: $eventId) {
      message
    }
  }
`;

interface IAttendEventResponse {
  attendEvent: {
    message?: string;
  };
}

export default async (attendeeId: string, eventId: string) => {
  const data: IAttendEventResponse = await apollo.mutate({
    mutation: ATTEND_EVENT,
    variables: { attendeeId, eventId },
    refetchQueries: [{ query: EVENTS }],
  });

  return data;
};
