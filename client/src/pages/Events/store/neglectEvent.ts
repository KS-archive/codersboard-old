import gql from 'graphql-tag';
import { apollo } from 'utils';
import { EVENTS } from './withEvents';

const NEGLECT_EVENT = gql`
  mutation neglectEvent($eventId: String!, $attendeeId: String!) {
    neglectEvent(eventId: $eventId, attendeeId: $attendeeId) {
      message
    }
  }
`;

interface INeglectEventResponse {
  neglectEvent: {
    message?: string;
  };
}

export default async (eventId: string, attendeeId: string) => {
  const data: INeglectEventResponse = await apollo.mutate({
    mutation: NEGLECT_EVENT,
    variables: { attendeeId, eventId },
    refetchQueries: [{ query: EVENTS }],
  });

  return data;
};
