import React from 'react';
import { Button } from 'antd';
import { Field, FieldArrayRenderProps } from 'formik';

import SkillCard from '../SkillCard';
import SkillSelect from '../SkillSelect';
import { UserSkill } from '..';
import { SelectWrapper, SkillsWrapper } from './styles';

const FormContent = ({ form, remove, replace, unshift }: FieldArrayRenderProps) => (
  <>
    <SelectWrapper>
      <SkillSelect unshift={unshift} values={form.values.skills} />
      <Button size="large" type="danger" htmlType="reset" disabled={!form.dirty || form.isSubmitting}>
        Anuluj
      </Button>
      <Button size="large" type="primary" htmlType="submit" loading={form.isSubmitting} disabled={!form.dirty}>
        Zapisz
      </Button>
    </SelectWrapper>
    <SkillsWrapper>
      {form.values.skills.map((skill: UserSkill, index: number) => (
        <Field
          key={index}
          name={`skills.${index}`}
          component={SkillCard}
          index={index}
          remove={remove}
          replace={replace}
        />
      ))}
    </SkillsWrapper>
  </>
);

export default FormContent;
