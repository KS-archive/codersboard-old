import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';
import { Input, TextArea, Select, DatePicker, ItemsSelect } from 'components/formik';
import { ISuccessValues } from '..';
import { SuccessFormContainer, Footer } from './styles';
import withUsers, { IWithUsers } from '../../store/withUsers';
import withProjects, { IWithProjects } from '../../store/withProjects';

const typeOptions = [
  {
    label: 'Wielki sukces',
    value: 'EPIC',
  },
  {
    label: 'Mały sukces',
    value: 'SMALL',
  },
  {
    label: 'Aktualność',
    value: 'NEWS',
  },
];

const SuccessForm: React.FC<IProps> = ({ status, values, users, projects }) => {
  const confirmButtonLabel = values.id ? 'Zapisz zmiany' : 'Dodaj sukces';
  const usersOptions = users ? users.map(({ id, fullName, image }) => ({ label: fullName, value: id, image })) : [];
  const projectsOptions = projects ? projects.map(({ id, name, image }) => ({ label: name, value: id, image })) : [];

  return (
    <SuccessFormContainer>
      <Field name="name" component={Input} label="Nazwa sukcesu" />
      <Field name="description" component={TextArea} label="Opis" />
      <Field name="date" component={DatePicker} label="Data osiągnięcia" placeholder={null} />
      <Field name="type" component={Select} label="Typ" options={typeOptions} />
      <Field
        name="users"
        component={ItemsSelect}
        label="Do sukcesu przyczynili się"
        options={usersOptions}
        isMulti
        placeholder="Wybierz osoby"
      />
      <Field
        name="project"
        component={ItemsSelect}
        label="Sukces osiągnięty w ramach projektu"
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
    </SuccessFormContainer>
  );
};

interface IProps extends FormikProps<ISuccessValues>, IWithUsers, IWithProjects {}

export default withProjects(withUsers(SuccessForm));
