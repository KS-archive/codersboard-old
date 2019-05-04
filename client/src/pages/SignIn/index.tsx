import React from 'react';
import { Formik, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as Logo } from 'static/logo.svg';
import { signIn } from 'store/user/mutations/SignIn';
import { Button } from 'antd';
import { Input } from 'components/formik';
import * as styles from './styles';

const { Container, Content, LogoWrapper, Form } = styles;

const initialValues = {
  email: 'mymail@mail.com',
  password: 'sdf234df',
};

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Błędny adres e-mail')
    .required('Email jest wymagany'),
  password: Yup.string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .required('Hasło jest wymagane'),
});

const handleSubmit = async (values: Values, actions: FormikActions<Values>) => {
  actions.resetForm();
  await signIn(values);
};

const SignIn = () => {
  return (
    <Container>
      <Content>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={SigninSchema}>
          {({ isSubmitting }) => (
            <Form>
              <Field name="email" component={Input} label="Adres e-mail" size="large" autoComplete="email" />
              <Field
                name="password"
                component={Input}
                label="Hasło"
                type="password"
                size="large"
                autoComplete="current-password"
              />
              <Button htmlType="submit" size="large" type="primary" block loading={isSubmitting}>
                Zaloguj się
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

interface Values {
  email: string;
  password: string;
}

export default SignIn;
