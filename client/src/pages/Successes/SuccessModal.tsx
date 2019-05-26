import React, { useState } from 'react';
import { Formik, FormikActions } from 'formik';
import { Modal } from 'antd';
import { SuccessType } from './store/withSuccesses';
import SuccessForm from './SuccessForm';

const newSuccessInitialValues: ISuccessValues = {
  name: '',
  description: '',
  date: '',
  type: 'SMALL',
  users: [],
  project: '',
};

let closeModal: () => void;

const handleSubmit = async (values: ISuccessValues, actions: FormikActions<ISuccessValues>) => {
  console.log(values);
  actions.setSubmitting(false);
  closeModal();
};

const SuccessModal: React.FC<IProps> = ({ formValues, onClose }) => {
  const [visible, setVisible] = useState(true);
  const title = formValues.id ? 'Edytuj sukces' : 'Dodaj nowy sukces';
  const initialValues = formValues.id ? formValues : newSuccessInitialValues;

  closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return (
    <Modal title={title} onCancel={closeModal} visible={visible} footer={null}>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit} render={SuccessForm} initialStatus={{ closeModal }} />
    </Modal>
  );
};

interface IProps {
  formValues: ISuccessValues;
  onClose: () => void;
}

export interface ISuccessValues {
  id?: string;
  name: string;
  description: string;
  date: string;
  type: SuccessType;
  users: string[];
  project: string;
}

export default SuccessModal;
