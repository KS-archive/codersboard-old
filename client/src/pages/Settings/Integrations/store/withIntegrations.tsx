import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const ME = gql`
  {
    me {
      id
      integrations {
        id
        key
        connector
        data
      }
    }
  }
`;

export interface IIntegration {
  id: string;
  key: string;
  connector: any;
  data: any;
}

interface IData {
  me: {
    id: string;
    integrations: IIntegration[],
  };
}

export interface IWithIntegrations {
  integrations: IIntegration[];
  integrationsLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={ME}>
    {({ data, loading }) => {
      return <WrapperComponent {...props} integrations={data.me ? data.me.integrations : []} integrationsLoading={loading} />;
    }}
  </Query>
);
