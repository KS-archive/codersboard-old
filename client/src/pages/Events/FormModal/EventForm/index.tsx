import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, DatePicker, ItemsSelect } from 'components/formik';
import { EventFormContainer, Footer } from './styles';
import { IEventValues } from 'pages/Events/store/createEvent';
import AreasQuery from 'pages/Events/store/AreasQuery';
import ProjectsQuery from 'pages/Events/store/ProjectsQuery';
import UsersQuery from 'pages/Events/store/UsersQuery';

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

const EventForm: React.FC<IProps> = ({ status, values }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj wydarzenie';

  return (
    <EventFormContainer>
      <Field name="title" component={Input} label="Nazwa wydarzenia" />
      <Field name="description" component={TextArea} label="Opis" />
      <Field name="location" component={Input} label="Lokalizacja" />
      <Field name="url" component={Input} label="Adres url wydarzenia" />
      <Field
        name="start"
        component={DatePicker}
        label="Data rozpoczęcia"
        placeholder={null}
        showTime={{ minuteStep: 5, format: 'HH:mm' }}
      />
      <Field
        name="end"
        component={DatePicker}
        label="Data zakończenia"
        placeholder={null}
        showTime={{ minuteStep: 5, format: 'HH:mm' }}
      />
      <Field name="type" component={Select} label="Typ" options={typeOptions} />
      <UsersQuery>
        {({ data: { users }, loading }) => (
          <Field
            name="attendees"
            component={ItemsSelect}
            label="Zaproszone osoby"
            options={users ? users.map(({ id, fullName, image }) => ({ label: fullName, value: id, image })) : []}
            isMulti
            placeholder="Wybierz osoby"
          />
        )}
      </UsersQuery>
      <ProjectsQuery>
        {({ data: { projects }, loading }) => (
          <Field
            name="projectId"
            component={ItemsSelect}
            label="Projekt powiązany z wydarzeniem"
            options={projects ? projects.map(({ id, name, image }) => ({ label: name, value: id, image })) : []}
            optionImageWidth={42}
            placeholder="Wybierz projekt"
          />
        )}
      </ProjectsQuery>
      <AreasQuery>
        {({ data: { areas }, loading }) => (
          <Field
            name="areaId"
            component={ItemsSelect}
            label="Obszar powiązany z wydarzeniem"
            options={areas ? areas.map(({ id, name, image }) => ({ label: name, value: id, image })) : []}
            optionImageWidth={42}
            placeholder="Wybierz obszar"
          />
        )}
      </AreasQuery>
      <Footer>
        <Button onClick={status.closeModal}>Anuluj</Button>
        <Button htmlType="submit" type="primary">
          {confirmButtonLabel}
        </Button>
      </Footer>
    </EventFormContainer>
  );
};

interface IProps extends FormikProps<IEventValues> {}

export default EventForm;
