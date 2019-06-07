import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { apollo } from 'utils';

type ProjectPermission = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';

export const ME = gql`
  {
    me {
      id
    }
  }
`;

export const PROJECT = gql`
  query project($url: String!, $userId: ID!) {
    project(where: { url: $url }) {
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

interface IProjectResponse {
  project: {
    id: string;
    members: {
      id: string;
      permissions: ProjectPermission;
    }[]
  }
}

export default (requiredPermissions: ProjectPermission[]) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const url = /\/projects\/(.*)\//.exec(window.location.pathname)[1];
      const { data: { me } } = await apollo.query<IMeResponse>({ query: ME });
      const { data: { project } } = await apollo.query<IProjectResponse>({ query: PROJECT, variables: { url, userId: me.id } });

      if (project.members.length) {
        const hasPermission = requiredPermissions.includes(project.members[0].permissions);
        setHasPermission(hasPermission);
      } else {
        setHasPermission(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return hasPermission;
}
