import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const ME = gql`
  {
    me {
      id
      codewars {
        id
        name
        data
      }
    }
  }
`;

export interface CodewarsData {
  name: string;
  honor: number;
  kyu: number;
  completedChallenges: number;
  leaderboardPosition: number;
  score: number;
  languages: {
    kyu: number;
    name: string;
    score: number;
  }[];
}

interface IData {
  me: {
    id: string;
    codewars?: {
      id: string;
      name: string;
      data: CodewarsData;
      __typename: 'CodeWars';
    };
  };
}

interface IIntegrations {
  codewars?: {
    name: string;
    data: any;
  };
  loading: boolean;
  [key: string]: any;
}

export interface IWithIntegrations {
  integrations: IIntegrations;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={ME}>
    {({ data, loading }) => {
      const integrations: IIntegrations = { loading };
      if (data.me) {
        if (data.me.codewars) integrations.codewars = data.me.codewars;
      }
      return <WrapperComponent {...props} integrations={integrations} />;
    }}
  </Query>
);
