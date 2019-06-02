import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { message } from 'antd';
import { Formik, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as Logo } from 'static/logo.svg';
import signIn, { ISignInVariables } from './store/signIn';
import { Button } from 'antd';
import { Input } from 'components/formik';
import { Container, Content, LogoWrapper, Form } from './styles';

const initialValues: ISignInVariables = {
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

const handleSubmit = async (values: ISignInVariables, actions: FormikActions<ISignInVariables>) => {
  try {
    await signIn(values);
    message.success('Pomyślnie zalogowano do profilu');
    actions.setStatus('submitted');
  } catch (ex) {
    message.error('Błąd podczas próby zalogowania do panelu');
    if (ex.message.includes('EMAIL_DOESNT_EXIST')) {
      actions.setFieldError('email', 'Użytkownik o podanym adresie nie istnieje');
    }
    if (ex.message.includes('WRONG_PASSWORD')) {
      actions.setFieldError('password', 'Błędne hasło');
    }
  }
  actions.setSubmitting(false);
};

const SignIn: React.FC<IProps> = ({ history }) => (
  <Container>
    <Content>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={SigninSchema}>
        {({ isSubmitting, status }) => {
          if (status === 'submitted') history.push('/');
          return (
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
          );
        }}
      </Formik>
    </Content>
  </Container>
);

interface IProps extends RouteComponentProps {}

export default withRouter(SignIn);
