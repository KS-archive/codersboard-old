import { MainPermission } from 'types/User';
import gql from 'graphql-tag';
import { apollo } from '.';

export const MY_PERMISSIONS = gql`
  {
    me {
      permissions
    }
  }
`;

interface IHasPermissionsResponse {
  me: {
    permissions: MainPermission[];
  }
}

export default async (requiredPermissions: MainPermission[]) => {
  const { data: { me: { permissions } } } = await apollo.query<IHasPermissionsResponse>({
    query: MY_PERMISSIONS,
  });

  return permissions.some(permission => requiredPermissions.includes(permission));
};
