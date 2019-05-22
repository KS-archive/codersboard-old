import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

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

export const withSkills = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={SKILLS}>{({ data }) => <WrapperComponent {...props} skills={data.skills} />}</Query>
);

export default (props: Props) => <Query<Data, {}> query={SKILLS}>{props.children}</Query>;

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
}

type User = {
  id: string;
}

export interface SkillProps {
  id: string;
  name: string;
  icon: string;
  users: User[];
}

export interface Data {
  skills: SkillProps[];
}
