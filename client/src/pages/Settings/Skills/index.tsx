import React from 'react';
import { message } from 'antd';
import { Formik, FormikActions } from 'formik';
import updateMySkills from './store/updateMySkills';
import withMySkills, { IWithMySkills, IMySkill } from './store/withMySkills';
import SkillsForm from './SkillsForm';

const handleSubmit = async (values: IValues, actions: FormikActions<IValues>) => {
  await updateMySkills(values.skills);
  message.success('Twoje umiejętności zostały zaktualizowane');
  actions.setSubmitting(false);
};

const Skills: React.FC<IProps> = ({ mySkills = [] }) => {
  return <Formik initialValues={{ skills: mySkills }} enableReinitialize onSubmit={handleSubmit} component={SkillsForm} />
};

interface IValues {
  skills: IMySkill[];
}

interface IProps extends IWithMySkills {}

export default withMySkills(Skills);
