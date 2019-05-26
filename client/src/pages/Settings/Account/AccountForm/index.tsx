import React from 'react';
import { Button } from 'antd';
import { Form, Field, FormikProps } from 'formik';
import { IUpdateProfileValues } from '../store/updateProfile';
import { Input, NumberInput } from 'components/formik';
import UniversitySelect from './UniversitySelect';
import { Grid, Title, Buttons, UserImageUpload, Row1, BasicDataColumn, StudiesDetails } from './styles';

const AccountForm: React.FC<FormikProps<IUpdateProfileValues>> = ({ values, dirty, isSubmitting }) => {
  return (
    <Form>
      <Title level={4}>Podstawowe dane</Title>
      <Row1>
        <Field name="image" component={UserImageUpload} label="Zdjęcie profilowe" width={400} height={400} />
        <BasicDataColumn>
          <Field name="fullName" component={Input} label="Imię i nazwisko" />
          <Field name="role" component={Input} label="Rola w CodersCrew" />
          <Field name="phone" component={Input} label="Telefon" />
        </BasicDataColumn>
      </Row1>
      <Grid>
        <Field name="email" component={Input} label="E-mail" />
        <Field name="companyEmail" component={Input} label="E-mail CodersCrew" />
      </Grid>
      <Title level={4}>Studia</Title>
      <Grid>
        <UniversitySelect />
        {values.university && (
          <>
            <Field name="universityDepartment" component={Input} label="Wydział" />
            <Field name="fieldOfStudy" component={Input} label="Kierunek" />
            <StudiesDetails>
              <Field name="year" component={NumberInput} min={1} max={5} label="Rok studiów" />
              <Field name="indexNumber" component={NumberInput} label="Numer indeksu" />
            </StudiesDetails>
          </>
        )}
      </Grid>
      <Buttons>
        <Button type="danger" htmlType="reset" disabled={!dirty || isSubmitting}>
          Anuluj
        </Button>
        <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={!dirty}>
          Zapisz zmiany
        </Button>
      </Buttons>
    </Form>
  );
};

export default AccountForm;
