import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { apollo } from 'utils';

type AreaPermission = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';

export const ME = gql`
  {
    me {
      id
    }
  }
`;

export const AREA = gql`
  query area($url: String!, $userId: ID!) {
    area(where: { url: $url }) {
      id
      members(where: { user: { id: $userId } }) {
        id
        permissions
      }
    }
  }
`;

interface IMeResponse {
  me: {
    id: string;
  }
}

interface IAreaResponse {
  area: {
    id: string;
    members: {
      id: string;
      permissions: AreaPermission;
    }[]
  }
}

export default (requiredPermissions: AreaPermission[]) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const url = /\/areas\/(.*)\//.exec(window.location.pathname)[1];
      const { data: { me } } = await apollo.query<IMeResponse>({ query: ME });
      const { data: { area } } = await apollo.query<IAreaResponse>({ query: AREA, variables: { url, userId: me.id } });

      if (area.members.length) {
        const hasPermission = requiredPermissions.includes(area.members[0].permissions);
        setHasPermission(hasPermission);
      } else {
        setHasPermission(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return hasPermission;
}
