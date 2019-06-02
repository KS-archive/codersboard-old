import React from 'react';
import { message } from 'antd';
import { Formik, FormikActions } from 'formik';
import { omit, uploadToCloudinary } from 'utils';
import withMe, { IWithMe } from './store/withMe';
import updateProfile, { IUpdateProfileValues } from './store/updateProfile';
import AccountForm from './AccountForm';

let profileURL = '';

const handleSubmit = async (values: IUpdateProfileValues, actions: FormikActions<IUpdateProfileValues>) => {
  try {
    if (typeof values.image === 'object') {
      const file = new File([values.image], profileURL, {
        type: values.image.type,
      });
      const image = await uploadToCloudinary(file, 'profile-image');
      values.image = image;
    }
    await updateProfile(values);
    message.success('Twój profil został zaktualizowany');
  } catch (ex) {
    message.error('Podczas aktualizacji profilu wystąpił błąd');
  }
  actions.setSubmitting(false);
};

const Account: React.FC<Props> = ({ me }) => {
  profileURL = me.profileURL;
  const university = me.university && me.university.id;
  const initialValues: IUpdateProfileValues = omit({ ...me, university }, ['id', 'profileURL', '__typename']);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      component={AccountForm}
      initialStatus={{ profileURL }}
    />
  );
};

interface Props extends IWithMe {}

export default withMe(Account);
