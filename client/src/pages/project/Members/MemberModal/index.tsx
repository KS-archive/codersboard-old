import React, { useState } from 'react';
import { Formik, FormikActions } from 'formik';
import { Modal, message } from 'antd';
import { IMember, PermissionType } from '../store/withMembers';
import createMember from '../store/createMember';
import updateMember from '../store/updateMember';
import MemberForm from './MemberForm';

const newMemberInitialValues: IMemberValues = {
  user: '',
  role: 'Członek projektu',
  responsibilities: '',
  permissions: 'MEMBER',
};

const parseMemberToValues = (member: IMember): IMemberValues => ({
  ...member,
  user: member.user && member.user.id,
});

let closeModal: () => void;

const handleSubmit = async (values: IMemberValues, actions: FormikActions<IMemberValues>) => {
  try {
    if (values.id) {
      await updateMember(values);
      message.success('Zaktualizowano dane członka projektu');
    } else {
      await createMember(values);
      message.success('Dodano nowego członka projektu');
    }
    console.log(values);

    actions.setSubmitting(false);
    closeModal();
  } catch (ex) {
    console.log(ex);
    message.error('Podczas dodawania członka wystąpił błąd');
  }
};

const MemberModal: React.FC<IProps> = ({ modalData, onClose }) => {
  const [visible, setVisible] = useState(true);
  const title = modalData.id ? 'Edytuj członka' : 'Dodaj nowego członka';
  const initialValues = modalData.id ? parseMemberToValues(modalData) : newMemberInitialValues;

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
        render={MemberForm}
        initialStatus={{ closeModal }}
      />
    </Modal>
  );
};

interface IProps {
  modalData: IMember;
  onClose: () => void;
}

export interface IMemberValues {
  id?: string;
  user: string,
  role: string,
  responsibilities: string,
  permissions: PermissionType,
}

export default MemberModal;
