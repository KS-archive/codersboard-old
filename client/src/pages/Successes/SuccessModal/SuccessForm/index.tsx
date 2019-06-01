import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, DatePicker, ItemsSelect, ProjectSelect } from 'components/formik';
import { ISuccessValues } from '..';
import { SuccessFormContainer, Footer } from './styles';
import withUsers, { IWithUsers } from '../../store/withUsers';

const typeOptions = [
  {
    label: 'Wielki sukces',
    value: 'EPIC',
  },
  {
    label: 'Mały sukces',
    value: 'SMALL',
  },
  {
    label: 'Aktualność',
    value: 'NEWS',
  },
];

const SuccessForm: React.FC<IProps> = ({ status, values, users }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj sukces';
  const options = users ? users.map(({ id, fullName, image }) => ({ label: fullName, value: id, image })) : [];

  return (
    <SuccessFormContainer>
      <Field name="name" component={Input} label="Nazwa sukcesu" />
      <Field name="description" component={TextArea} label="Opis" />
      <Field name="date" component={DatePicker} label="Data osiągnięcia" placeholder={null} />
      <Field name="type" component={Select} label="Typ" options={typeOptions} />
      <Field name="users" component={ItemsSelect} label="Do sukcesu przyczynili się" options={options} isMulti placeholder="Wybierz osoby" />
      <Field name="project" component={ProjectSelect} label="Sukces osiągnięty w ramach projektu" />
      <Footer>
        <Button onClick={status.closeModal}>Anuluj</Button>
        <Button htmlType="submit" type="primary">{confirmButtonLabel}</Button>
      </Footer>
    </SuccessFormContainer>
  );
};

interface IProps extends FormikProps<ISuccessValues>, IWithUsers {}

export default withUsers(SuccessForm);
