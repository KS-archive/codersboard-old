import { FormikProps } from 'formik';

export const getStatus = (form: FormikProps<any>, errorMessage: string) => {
  if (errorMessage) {
    return 'error';
  } else if (form.isSubmitting || form.isValidating) {
    return 'validating';
  }
  return null;
};
