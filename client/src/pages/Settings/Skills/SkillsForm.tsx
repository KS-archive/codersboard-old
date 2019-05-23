import React from 'react';
import { Form, FieldArray } from 'formik';
import FormContent from './FormContent';

const SkillsForm = () => (
  <Form>
    <FieldArray name="skills" render={FormContent} />
  </Form>
);

export default SkillsForm;
