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
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await apollo.query<IMeResponse>({ query: ME });
      setHasAccess(event.owner.id === data.me.id);
    })()
  }, [event.id, event.owner.id]);

  return hasAccess;
}
