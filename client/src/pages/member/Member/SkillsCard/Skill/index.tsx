import React from 'react';
import { SkillCardContainer, SkillIcon, SkillName, Rating, RatingDot } from './styles';

const Skill: React.FC<IProps> = ({ level, skill: { name, icon } }) => {
  return (
    <SkillCardContainer>
      <SkillIcon src={icon} />
      <SkillName>{name}</SkillName>
      <Rating disabled value={level} character={<RatingDot />} />
    </SkillCardContainer>
  );
};

interface IProps {
  id: string;
  skill: {
    id: string;
    name: string;
    icon: string;
    __typename: 'Skill';
  };
  level: number;
  __typename: 'UserSkill';
}

export default Skill;
