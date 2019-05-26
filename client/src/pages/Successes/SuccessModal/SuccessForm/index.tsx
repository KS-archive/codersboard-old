import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, DatePicker, UserSelect, ProjectSelect } from 'components/formik';
import { ISuccessValues } from '..';
import { SuccessFormContainer, Footer } from './styles';

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

const SuccessForm: React.FC<IProps> = ({ status, values }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj sukces';

  return (
    <SuccessFormContainer>
      <Field name="name" component={Input} label="Nazwa sukcesu" />
      <Field name="description" component={TextArea} label="Opis" />
      <Field name="date" component={DatePicker} label="Data osiągnięcia" placeholder={null} />
      <Field name="type" component={Select} label="Typ" options={typeOptions} />
      <Field name="users" component={UserSelect} label="Do sukcesu przyczynili się" mode="multiple" />
      <Field name="project" component={ProjectSelect} label="Sukces osiągnięty w ramach projektu" />
      <Footer>
        <Button onClick={status.closeModal}>Anuluj</Button>
        <Button htmlType="submit" type="primary">{confirmButtonLabel}</Button>
      </Footer>
    </SuccessFormContainer>
  );
};

interface IProps extends FormikProps<ISuccessValues> {}

export default SuccessForm;
