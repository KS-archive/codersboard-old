import React from 'react';
import { Formik, FormikActions } from 'formik';
import { pick } from 'utils';
import { MeProps, withMe } from 'store/user/queries/Me';
import AccountForm from './AccountForm';

const handleSubmit = (values: Values, actions: FormikActions<Values>) => {
  console.log(values);
  actions.setSubmitting(false);
};

const Account: React.FC<Props> = ({ me }) => {
  const initialValues = {
    ...pick(me, [
      'companyEmail',
      'email',
      'fieldOfStudy',
      'fullName',
      'image',
      'indexNumber',
      'phone',
      'role',
      'universityDepartment',
      'year',
    ]),
  };
  initialValues.university = me.university && me.university.id

  return <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit} component={AccountForm} />;
};

interface Props {
  me: MeProps;
}

export interface Values {
  companyEmail: string;
  email: string;
  fieldOfStudy: string;
  fullName: string;
  image: string;
  indexNumber: number;
  phone: string;
  role: string;
  university: string;
  universityDepartment: string;
  year: number;
}

export default withMe(Account);
