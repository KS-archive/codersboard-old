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

export default (requiredPermissions: MainPermission[]) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await apollo.query<IMeResponse>({ query: ME });
      const hasPermission = data.me.permissions.some(permission => requiredPermissions.includes(permission));
      setHasPermission(hasPermission);
    })();
    // eslint-disable-next-line
  }, []);

  return hasPermission;
}

