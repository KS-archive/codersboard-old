import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Formik, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import { Input } from 'components/formik';
import integrateCodeWars, { IIntegrateCodewarsValues } from '../store/integrateCodewars';

const initialValues = {
  name: '',
};

const integrateCodewarsSchema = Yup.object().shape({
  name: Yup.string().required('Nazwa użytkownika na Codewars jest wymagana'),
});

const handleSubmit = async (values: IIntegrateCodewarsValues, actions: FormikActions<any>) => {
  try {
    await integrateCodeWars(values);
    actions.setSubmitting(false);
    message.success('Portal Codewars został zintegrowany');
    actions.setStatus('submitted');
  } catch (ex) {
    if (ex.message.includes('404')) {
      message.error('Podczas integracji wystąpił błąd');
      actions.setFieldError('name', 'Użytkownik o podanej nazwie nie istnieje');
    }
  }
};

const CodewarsIntegrate: React.FC<IProps> = ({ handleClose }) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={integrateCodewarsSchema}>
      {({ submitForm, status, setStatus }) => {
        if (status === 'submitted') {
          setStatus('initial');
          closeModal();
        }

        return (
          <Modal title="Zintegruj konto na Codewars" visible={visible} onOk={submitForm} onCancel={handleClose}>
            <Field name="name" label="Nazwa użytkownika na Codewars" component={Input} />
          </Modal>
        );
      }}
    </Formik>
  );
};

interface IProps {
  handleClose: () => void;
}

export default CodewarsIntegrate;
