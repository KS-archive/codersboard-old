import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { apollo } from 'utils';
import { IEvent } from '../store/withEvents';

export const ME = gql`
  {
    me {
      id
    }
  }
`;

interface IMeResponse {
  me: {
    id: string;
  }
}

export default (event: IEvent) => {
  const [attendeeData, setAttendeeData] = useState<{ status?: string; id?: string }>({});

  useEffect(() => {
    (async () => {
      const { data } = await apollo.query<IMeResponse>({ query: ME });
      const attendee = event.attendees.find(({ user: { id } }) => id === data.me.id);

      if (attendee) {
        setAttendeeData({ status: attendee.status, id: attendee.id });
      } else {
        setAttendeeData({});
      }
    })()
  }, [event.id, event.attendees]);

  return attendeeData;
}
