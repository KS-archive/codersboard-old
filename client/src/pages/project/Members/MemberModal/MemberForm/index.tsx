import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, UserSelect } from 'components/formik';
import { IMemberValues } from '..';
import { MemberFormContainer, Footer } from './styles';

const permissionsOptions = [
  {
    label: 'Koordynator',
    value: 'OWNER',
  },
  {
    label: 'Administrator',
    value: 'ADMIN',
  },
  {
    label: 'Członek',
    value: 'MEMBER',
  },
  {
    label: 'Gość',
    value: 'GUEST',
  },
];

const MemberForm: React.FC<IProps> = ({ status, values }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj członka';

  return (
    <MemberFormContainer>
      <Field name="user" component={UserSelect} label="Osoba do dodania" />
      <Field name="role" component={Input} label="Rola w projekcie" />
      <Field name="permissions" component={Select} label="Uprawnienia" options={permissionsOptions} />
      <Field name="responsibilities" component={TextArea} label="Obowiązki" />
      <Footer>
        <Button onClick={status.closeModal}>Anuluj</Button>
        <Button htmlType="submit" type="primary">{confirmButtonLabel}</Button>
      </Footer>
    </MemberFormContainer>
  );
};

interface IProps extends FormikProps<IMemberValues> {}

export default MemberForm;
