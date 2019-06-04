import React, { useState } from 'react';
import { Formik, FormikActions } from 'formik';
import { Modal, message } from 'antd';
import EventForm from './EventForm';
import createEvent, { IEventValues } from '../store/createEvent';
import { IEvent } from '../store/withEvents';

const newEventInitialValues: IEventValues = {
  title: '',
  description: '',
  start: new Date(),
  end: undefined,
  allDay: false,
  attendees: [],
  location: '',
  url: '',
  projectId: '',
  areaId: '',
  type: 'OPEN',
};

const parseEventToValues = (event: IEvent): IEventValues => ({
  ...event,
  attendees: event.attendees.map(({ user: { id } }) => id),
  projectId: event.project && event.project.id,
  areaId: event.area && event.area.id,
});

const parseNewEventToValues = (event: IEvent): IEventValues => ({
  ...newEventInitialValues,
  start: event.start,
  end: event.end,
});

let closeModal: () => void;

const handleSubmit = async (values: IEventValues, actions: FormikActions<IEventValues>) => {
  try {
    if (values.id) {
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
  const initialValues: IEventValues = data.id ? parseEventToValues(data) : parseNewEventToValues(data);

  closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <Modal title={title} onCancel={closeModal} visible={visible} footer={null}>
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
