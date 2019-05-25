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

export interface IWithSkills {
  skills: ISkill[];
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IWithSkills, {}> query={SKILLS}>{({ data }) => <WrapperComponent {...props} skills={data.skills} />}</Query>
);
