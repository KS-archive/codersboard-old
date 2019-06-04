import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, DatePicker, ItemsSelect } from 'components/formik';
import { EventFormContainer, Footer } from './styles';
import withUsers, { IWithUsers } from '../../store/withUsers';
import withProjects, { IWithProjects } from '../../store/withProjects';
import { IEventValues } from 'pages/Events/store/createEvent';

const typeOptions = [
  {
    label: 'Otwarte',
    value: 'OPEN',
  },
  {
    label: 'Zamknięte',
    value: 'PRIVATE',
  },
];

const EventForm: React.FC<IProps> = ({ status, values, users, projects }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj wydarzenie';
  const usersOptions = users ? users.map(({ id, fullName, image }) => ({ label: fullName, value: id, image })) : [];
  const projectsOptions = projects ? projects.map(({ id, name, image }) => ({ label: name, value: id, image })) : [];

  return (
    <EventFormContainer>
      <Field name="title" component={Input} label="Nazwa wydarzenia" />
      <Field name="description" component={TextArea} label="Opis" />
      <Field name="location" component={Input} label="Lokalizacja" />
      <Field name="url" component={Input} label="Adres url wydarzenia" />
      <Field name="start" component={DatePicker} label="Data rozpoczęcia" placeholder={null} />
      <Field name="end" component={DatePicker} label="Data zakończenia" placeholder={null} />
      <Field name="type" component={Select} label="Typ" options={typeOptions} />
      <Field
        name="attendees"
        component={ItemsSelect}
        label="Zaproszone osoby"
        options={usersOptions}
        isMulti
        placeholder="Wybierz osoby"
      />
      <Field
        name="projectId"
        component={ItemsSelect}
        label="Projekt powiązany z wydarzeniem"
        options={projectsOptions}
        optionImageWidth={42}
        placeholder="Wybierz projekt"
      />
      <Footer>
        <Button onClick={status.closeModal}>Anuluj</Button>
        <Button htmlType="submit" type="primary">
          {confirmButtonLabel}
        </Button>
      </Footer>
    </EventFormContainer>
  );
};

interface IProps extends FormikProps<IEventValues>, IWithUsers, IWithProjects {}

export default withProjects(withUsers(EventForm));
