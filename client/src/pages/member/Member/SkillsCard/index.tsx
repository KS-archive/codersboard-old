import React from 'react';

import CardBase from '../CardBase';
import Skill from './Skill';
import { SkillsGrid } from './styles';

const SkillsCard: React.FC<IProps> = ({ skills }) => {
  return (
    <CardBase title="Umiejętności">
      <SkillsGrid>
        {skills.map(skill => (
          <Skill key={skill.id} {...skill} />
        ))}
      </SkillsGrid>
    </CardBase>
  );
};

interface IProps {
  skills: {
    id: string;
    skill: {
      id: string;
      name: string;
      icon: string;
      __typename: 'Skill';
    };
    level: number;
    __typename: 'UserSkill';
  }[];
}

SkillsCard.defaultProps = {
  skills: [],
};

export default SkillsCard;
