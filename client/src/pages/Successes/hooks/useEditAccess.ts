import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { apollo } from 'utils';
import { IUser } from '../store/withSuccesses';
import useHasMainPermission from 'hooks/useHasMainPermission';

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
  };
}

export default (creator: IUser) => {
  const isAdmin = useHasMainPermission(['OWNER']);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await apollo.query<IMeResponse>({ query: ME });
      setHasAccess(creator.id === data.me.id || isAdmin);
    })();
  }, [creator.id, isAdmin]);

  return hasAccess;
};
