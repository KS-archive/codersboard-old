import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const SKILLS = gql`
  {
    skills {
      id
      name
      icon
      users {
        id
      }
    }
  }
`;

type IUser = {
  id: string;
}

export interface ISkill {
  id: string;
  name: string;
  icon: string;
  users: IUser[];
}

export interface IWithSkills {
  skills: ISkill[];
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IWithSkills, {}> query={SKILLS}>{({ data }) => <WrapperComponent {...props} skills={data.skills} />}</Query>
);

