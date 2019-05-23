import React from 'react';
import { Typography } from 'antd';
import { Form, Field, FormikProps } from 'formik';
import { Values } from '..';
import { Input, NumberInput } from 'components/formik';
import { Grid } from './styles';

const { Title } = Typography;

const AccountForm: React.FC<FormikProps<Values>> = ({ values }) => {
  return (
    <Form>
      <Title level={4}>Podstawowe dane</Title>
      <Grid>
        <Field name="fullName" component={Input} label="Imię i nazwisko" />
        <Field name="phone" component={Input} label="Telefon" />
        <Field name="email" component={Input} label="E-mail" />
        <Field name="companyEmail" component={Input} label="E-mail CodersCrew" />
        <Field name="image" component={Input} label="Zdjęcie profilowe" />
        <Field name="role" component={Input} label="Rola w CodersCrew" />
      </Grid>
      <Title level={4}>Studia</Title>
      <Grid>
        <Field name="university" component={Input} label="Uczelnia" />
        {values.university && (
          <>
            <Field name="universityDepartment" component={Input} label="Wydział" />
            <Field name="fieldOfStudy" component={Input} label="Kierunek" />
            <Field name="year" component={NumberInput} min={1} max={5} label="Rok studiów" />
            <Field name="indexNumber" component={NumberInput} label="Numer indeksu" />
          </>
        )}
      </Grid>
    </Form>
  );
};

export default AccountForm;
