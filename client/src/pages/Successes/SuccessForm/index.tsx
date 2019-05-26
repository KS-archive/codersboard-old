import React from 'react';
import { Button } from 'antd';
import { Field, Form, FormikProps } from 'formik';
import { Input, TextArea, Select } from 'components/formik';
import { ISuccessValues } from '../SuccessModal';
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

const SuccessForm: React.FC<IProps> = ({ status }) => {
  return (
    <SuccessFormContainer>
      <Field name="name" component={Input} label="Nazwa sukcesu" />
      <Field name="description" component={TextArea} label="Opis" />
      <Field name="name" component={Input} label="Data osiągnięcia" />
      <Field name="type" component={Select} label="Typ" options={typeOptions} />
      <Footer>
        <Button onClick={status.closeModal}>Anuluj</Button>
        <Button htmlType="submit" type="primary">Dodaj sukces</Button>
      </Footer>
    </SuccessFormContainer>
  );
};

interface IProps extends FormikProps<ISuccessValues> {}

export default SuccessForm;
