import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, ItemsSelect } from 'components/formik';
import { IMemberValues } from '..';
import { MemberFormContainer, Footer } from './styles';
import withUsers, { IWithUsers } from '../../store/withUsers';

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

const MemberForm: React.FC<IProps> = ({ status, values, users }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj członka';
  const options = users ? users.map(({ id, fullName, image }) => ({ label: fullName, value: id, image })) : [];

  return (
    <MemberFormContainer>
      {!values.id && <Field name="user" component={ItemsSelect} label="Osoba do dodania" options={options} placeholder="Wybierz osobę" />}
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

interface IProps extends FormikProps<IMemberValues>, IWithUsers {}

export default withUsers(MemberForm);
