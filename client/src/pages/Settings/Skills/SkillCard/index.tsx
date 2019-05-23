import React from 'react';
import { ReactComponent as Times } from 'static/fa/regular/times.svg';
import { FieldProps } from 'formik';
import { SkillCardContainer, RemoveIcon, SkillIcon, SkillName, Rating, RatingDot } from './styles';

const SkillCard: React.FC<Props> = ({ form, field, index, remove, replace }) => (
  <SkillCardContainer>
    <RemoveIcon icon={Times} onClick={() => remove(index)} />
    <SkillIcon src={field.value.skill.icon} />
    <SkillName>{field.value.skill.name}</SkillName>
    <Rating
      value={field.value.level}
      character={<RatingDot />}
      onChange={value => replace(index, { ...field.value, level: value })}
      onBlur={() => form.setFieldTouched(`skills.${index}`, true)}
    />
  </SkillCardContainer>
);

interface Props extends FieldProps {
  index: number;
  remove: (index: number) => void;
  replace: (index: number, value: any) => void;
}

export default SkillCard;
