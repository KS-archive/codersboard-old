import React from 'react';
import { Field } from 'formik';
import { Select } from 'components/formik';
import { withUniversities, UniversityProps } from 'store/university/queries/Universities';

const UniversitySelect: React.FC<Props> = ({ universities = [] }) => {
  const options = universities.map(({ id, name }) => ({ label: name, value: id }));
  return <Field component={Select} name="university" label="Uczelnia" options={options} loading={!options.length} allowClear />;
};

interface Props {
  universities: UniversityProps[];
}

export default withUniversities(UniversitySelect);
