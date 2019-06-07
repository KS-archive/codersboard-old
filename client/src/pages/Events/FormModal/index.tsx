import React, { useState } from 'react';
import { Formik, FormikActions } from 'formik';
import { Modal, message } from 'antd';
import EventForm from './EventForm';
import createEvent, { IEventValues } from '../store/createEvent';
import updateEvent from '../store/updateEvent';
import { IEvent, EventType } from '../store/withEvents';
import { parseEventToEventValues } from '../helpers';

const newEventInitialValues = {
  title: '',
  description: '',
  attendees: [] as any[],
  location: '',
  url: '',
  projectId: '',
  areaId: '',
  type: 'OPEN' as EventType,
  owner: {} as any,
};

let closeModal: () => void;

const handleSubmit = async (values: IEventValues, actions: FormikActions<IEventValues>) => {
  try {
    if (values.id) {
      await updateEvent(values);
      message.success('Zaktualizowano wydarzenie');
    } else {
      await createEvent(values);
      message.success('Dodano nowe wydarzenie');
    }

    actions.setSubmitting(false);
    closeModal();
  } catch (ex) {
    message.error(`Podczas ${values.id ? 'edycji' : 'dodawania'} wydarzenia wystąpił błąd`);
  }
};

const FormModal: React.FC<IProps> = ({ data, handleClose }) => {
  const [visible, setVisible] = useState(true);
  const title = data.id ? 'Edytuj wydarzenie' : 'Dodaj nowe wydarzenie';
  const initialValues = data.id
    ? data
    : parseEventToEventValues({
        ...newEventInitialValues,
        start: data.start,
        end: data.end,
      });

  closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <Modal title={title} onCancel={closeModal} visible={visible} footer={null} width={640}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        render={EventForm}
        initialStatus={{ closeModal }}
      />
    </Modal>
  );
};

interface IProps {
  data: IEvent;
  handleClose: () => void;
}

export default FormModal;
