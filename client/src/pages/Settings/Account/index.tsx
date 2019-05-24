import React from 'react';
import { message } from 'antd';
import { Formik, FormikActions } from 'formik';
import { pick } from 'utils';
import { MeProps, withMe } from 'store/user/queries/Me';
import { updateProfile } from 'store/user/mutations/updateProfile';
import AccountForm from './AccountForm';

const handleSubmit = async (values: Values, actions: FormikActions<Values>) => {
  try {
    await updateProfile(values);
    message.success('Twój profil został zaktualizowany');
  } catch (ex) {
    message.error('Podczas aktualizacji profilu wystąpił błąd');
  }
  actions.setSubmitting(false);
};

// TODO: Data validation
// TODO: Adding/updating image (with crop modal)

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
