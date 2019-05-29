import gql from 'graphql-tag';
import { apollo } from 'utils';
import { IMySkill } from './withMySkills';

const MY_SKILLS = gql`
  {
    mySkills {
      id
      skill {
        id
      }
    }
  }
`;

const SKILLS = gql`
  {
    skills {
      id
      users {
        id
      }
    }
  }
`;

const UPDATE_MY_SKILLS = gql`
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

interface IUpdateMySkillsResponse {
  updateMySkills: IMySkill;
}

export default async (variables: IMySkill[]) => {
  variables.forEach(variable => {
    delete variable.skill.__typename;
    delete variable.__typename;
    return variable;
  });

  const data: IUpdateMySkillsResponse = await apollo.mutate({
    mutation: UPDATE_MY_SKILLS,
    variables: { data: variables },
    refetchQueries: [{ query: MY_SKILLS }, { query: SKILLS }],
  });
  return data;
};
