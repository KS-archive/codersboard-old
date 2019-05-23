import React from 'react';
import { message } from 'antd';
import { Formik, FormikActions } from 'formik';
import { updateMySkills } from 'store/skill/mutations/updateMySkills';
import { withMySkills, Data as MySkillsData } from 'store/skill/queries/MySkills';
import SkillsForm from './SkillsForm';

const handleSubmit = async (values: Values, actions: FormikActions<Values>) => {
  const valuesToSubmit = values.skills.map(({ skill, level, id }) => ({ skillId: skill.id, level, id }));
  await updateMySkills(valuesToSubmit);
  message.success('Twoje umiejętności zostały zaktualizowane');
  actions.setSubmitting(false);
};

const Skills: React.FC<Props> = ({ mySkills = [], mySkillsLoading }) => {
  return <Formik initialValues={{ skills: mySkills }} enableReinitialize onSubmit={handleSubmit} component={SkillsForm} />
};

export interface UserSkill {
  id: string;
  skill: {
    id: string;
    name: string;
    icon: string;
  };
  level: number;
}

interface Values {
  skills: UserSkill[];
}

interface Props extends MySkillsData {}

export default withMySkills(Skills);
