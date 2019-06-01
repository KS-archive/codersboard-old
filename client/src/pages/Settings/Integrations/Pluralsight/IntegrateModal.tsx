import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Formik, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import { Input } from 'components/formik';
import integratePluralsight, { IIntegratePluralsightValues } from '../store/integratePluralsight';

const initialValues = {
  key: '',
};

const integratePluralsightSchema = Yup.object().shape({
  key: Yup.string().required('ID na Pluralsight jest wymagane'),
});

const handleSubmit = async (values: IIntegratePluralsightValues, actions: FormikActions<IIntegratePluralsightValues>) => {
  try {
    await integratePluralsight(values);
    actions.setSubmitting(false);
    message.success('Portal Pluralsight został zintegrowany');
    actions.setStatus('submitted');
  } catch (ex) {
    if (ex.message.includes('404')) {
      message.error('Podczas integracji wystąpił błąd');
      actions.setFieldError('key', 'Użytkownik o podanym kluczu nie istnieje');
    }
  }
};

const PluralsightIntegrate: React.FC<IProps> = ({ handleClose }) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={integratePluralsightSchema}>
      {({ submitForm, status, setStatus }) => {
        if (status === 'submitted') {
          setStatus('initial');
          closeModal();
        }

        return (
          <Modal title="Zintegruj konto na Pluralsight" visible={visible} onOk={submitForm} onCancel={handleClose}>
            <Field name="key" label="Klucz na Pluralsight" component={Input} />
          </Modal>
        );
      }}
    </Formik>
  );
};

interface IProps {
  handleClose: () => void;
}

export default PluralsightIntegrate;
