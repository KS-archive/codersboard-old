import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const SKILLS = gql`
  {
    skills {
      id
      name
      icon
    }
  }
`;

export interface ISkill {
  id: string;
  name: string;
  icon: string;
}

interface IData {
  skills: ISkill[];
}

export interface IWithSkills extends IData {}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={SKILLS}>{({ data }) => <WrapperComponent {...props} skills={data.skills} />}</Query>
);
