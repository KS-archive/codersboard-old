import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

export interface IMySkill {
  id: string;
  skill: {
    id: string;
    name: string;
    icon: string;
    __typename: string;
  };
  level: number;
}

interface IData {
  mySkills: IMySkill[];
}

export interface IWithMySkills extends IData {}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={MY_SKILLS}>
    {({ data }) => <WrapperComponent {...props} mySkills={data.mySkills} />}
  </Query>
);
