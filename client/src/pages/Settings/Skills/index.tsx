import React from 'react';
import { message } from 'antd';
import { Formik, FormikActions } from 'formik';
import updateMySkills from './store/updateMySkills';
import withMySkills, { IWithMySkills, IMySkill } from './store/withMySkills';
import SkillsForm from './SkillsForm';

const handleSubmit = async (values: Values, actions: FormikActions<Values>) => {
  await updateMySkills(values.skills);
  message.success('Twoje umiejętności zostały zaktualizowane');
  actions.setSubmitting(false);
};

const Skills: React.FC<Props> = ({ mySkills = [] }) => {
  return <Formik initialValues={{ skills: mySkills }} enableReinitialize onSubmit={handleSubmit} component={SkillsForm} />
};

interface Values {
  skills: IMySkill[];
}

interface Props extends IWithMySkills {}

export default withMySkills(Skills);
