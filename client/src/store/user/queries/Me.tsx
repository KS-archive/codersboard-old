import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { MainPermission } from 'types/User';

export const ME = gql`
  {
    me {
      id
      fullName
      image
      email
      permissions
      skills {
        skill {
          id
        }
      }
    }
  }
`;

export const withMe = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={ME}>{({ data }) => <WrapperComponent {...props} me={data.me} />}</Query>
);

export default (props: Props) => <Query<Data, {}> query={ME}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface MeProps {
  id: string;
  fullName: string;
  image: string;
  email: string;
  permissions: MainPermission[];
  skills: {
    skill: {
      id: string;
    }
  }[]
}

export interface Data {
  me: MeProps;
}
