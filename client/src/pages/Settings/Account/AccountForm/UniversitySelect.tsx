import React from 'react';
import { Field } from 'formik';
import { Select } from 'components/formik';
import withUniversities, { IWithUniversities } from '../store/withUniversities';

const UniversitySelect: React.FC<IProps> = ({ universities = [] }) => {
  const options = universities.map(({ id, name }) => ({ label: name, value: id }));
  return <Field component={Select} name="university" label="Uczelnia" options={options} loading={!options.length} allowClear />;
};

interface IProps extends IWithUniversities {}

export default withUniversities(UniversitySelect);
