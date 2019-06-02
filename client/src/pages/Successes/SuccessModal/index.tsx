import React, { useState } from 'react';
import { Formik, FormikActions } from 'formik';
import { Modal, message } from 'antd';
import { SuccessType, ISuccess } from '../store/withSuccesses';
import createSuccess from '../store/createSuccess';
import updateSuccess from '../store/updateSuccess';
import SuccessForm from './SuccessForm';

const newSuccessInitialValues: ISuccessValues = {
  name: '',
  description: '',
  date: '',
  type: 'SMALL',
  users: [],
  project: '',
};

const parseSuccessToValues = (success: ISuccess): ISuccessValues => ({
  ...success,
  users: success.users.map(({ id }) => id),
  project: success.project && success.project.id,
});

let closeModal: () => void;

const handleSubmit = async (values: ISuccessValues, actions: FormikActions<ISuccessValues>) => {
  try {
    if (values.id) {
      await updateSuccess(values);
      message.success('Zaktualizowano sukces');
    } else {
      await createSuccess(values);
      message.success('Dodano nowy sukces');
    }

    actions.setSubmitting(false);
    closeModal();
  } catch (ex) {
    message.error('Podczas dodawania sukcesu wystąpił błąd');
  }
};

const SuccessModal: React.FC<IProps> = ({ modalData, onClose }) => {
  const [visible, setVisible] = useState(true);
  const title = modalData.id ? 'Edytuj sukces' : 'Dodaj nowy sukces';
  const initialValues = modalData.id ? parseSuccessToValues(modalData) : newSuccessInitialValues;

  closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Modal title={title} onCancel={closeModal} visible={visible} footer={null}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        render={SuccessForm}
        initialStatus={{ closeModal }}
      />
    </Modal>
  );
};

interface IProps {
  modalData: ISuccess;
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
