import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import client from 'store/client';
import { ME } from 'store/user/queries/Me';
import { MY_SKILLS } from 'store/skill/queries/MySkills';

export const UPDATE_MY_SKILLS = gql`
  mutation updateMySkills($data: [UpdateMySkillsInput!]!) {
    updateMySkills(data: $data) {
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

export default (props: Props) => <Mutation<Data, UserSkillValue[]> mutation={UPDATE_MY_SKILLS}>{props.children}</Mutation>;

export const updateMySkills = async (variables: UserSkillValue[]) => {
  try {
    const data = await client.mutate({
      mutation: UPDATE_MY_SKILLS,
      variables: { data: variables },
      refetchQueries: [{ query: ME }, { query: MY_SKILLS }],
    });
    return data;
  } catch (ex) {
    return ex;
  }
};

interface Props {
  children: (data: any) => React.ReactElement;
}

interface Data {
  updateMySkills: {
    id: string;
    skill: {
      id: string;
      name: string;
      icon: string;
    };
    level: number;
  };
}

interface UserSkillValue {
  id: string;
  skillId: string;
  level: number;
}
