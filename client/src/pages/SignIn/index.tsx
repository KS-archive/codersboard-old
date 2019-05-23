import React from 'react';
import { message } from 'antd';
import { Formik, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as Logo } from 'static/logo.svg';
import { signIn } from 'store/user/mutations/SignIn';
import { Button } from 'antd';
import { Input } from 'components/formik';
import * as styles from './styles';

const { Container, Content, LogoWrapper, Form } = styles;

const initialValues = {
  email: '',
  password: '',
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
  try {
    await signIn(values);
    message.success('Pomyślnie zalogowano do profilu');
  } catch (ex) {
    message.error('Błąd podczas próby zalogowania do panelu');
    console.log(ex.message);
    if (ex.message.includes('EMAIL_DOESNT_EXIST')) {
      actions.setFieldError('email', 'Użytkownik o podanym adresie nie istnieje');
    }
    if (ex.message.includes('WRONG_PASSWORD')) {
      actions.setFieldError('password', 'Błędne hasło');
    }
  }
  actions.setSubmitting(false);
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
