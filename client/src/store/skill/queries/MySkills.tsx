import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const MY_SKILLS = gql`
  {
    mySkills {
      id
      skill {
        id
        name
        icon
      }
      level
    }
  }
`;

export const withMySkills = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={MY_SKILLS}>
    {({ data, loading }) => <WrapperComponent {...props} mySkills={data.mySkills} mySkillsLoading={loading} />}
  </Query>
);

export default (props: Props) => <Query<Data, {}> query={MY_SKILLS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export interface MySkillProps {
  id: string;
  skill: {
    id: string;
    name: string;
    icon: string;
  };
  level: number;
}

export interface Data {
  mySkills: MySkillProps[];
  mySkillsLoading: boolean;
}
