import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { apollo } from 'utils';

type MainPermission =  'OWNER' | 'ADMIN' | 'MEMBER' | 'TRAINEE' | 'HR' | 'FINANCE' | 'DATA';

export const ME = gql`
  {
    me {
      id
      permissions
    }
  }
`;

interface IMeResponse {
  me: {
    id: string;
    permissions: MainPermission[];
  }
}

export default () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await apollo.query<IMeResponse>({ query: ME });
      setPermissions(data.me.permissions);
    })()
  }, []);

  return permissions;
}

