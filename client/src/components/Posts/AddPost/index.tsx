import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import { Formik, Field, Form, FormikActions } from 'formik';
import * as Yup from 'yup';
import withMe, { IMe } from '../store/withMe';
import { Input, TextArea } from '../../formik';
import { addPostProject, addPostArea } from '../store/AddPost';

const initialValues: IFormValues = {
  title: '',
  content: '',
};

const addPostSchema = Yup.object().shape({
  title: Yup.string().required('Tytuł jest wymagany'),
  content: Yup.string().required('Treść jest wymagana'),
});

const AddPost = (props: Props) => {
  const { areaURL, projectURL } = props.match.params;
  const handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const formValuesArea = {
      data: {
        ...values,
        user: {
          connect: {
            id: props.me.id,
          },
        },
        area: {
          connect: {
            url: props.area,
          },
        },
      },
    };
    const formValuesProject = {
      data: {
        ...values,
        user: {
          connect: {
            id: props.me.id,
          },
        },
        project: {
          connect: {
            url: props.match.params.projectURL,
          },
        },
      },
    };
    actions.resetForm();

    areaURL ? await addPostArea(formValuesArea, areaURL) : await addPostProject(formValuesProject, projectURL);
    props.hideModal();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addPostSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Tytuł" size="large" component={Input} />
          <Field type="text" name="content" label="Treść" component={TextArea} />
          <Button htmlType="submit" size="large" type="primary" block loading={isSubmitting}>
            Dodaj
          </Button>
        </Form>
      )}
    </Formik>
  );
};

interface IFormValues {
  title: string;
  content: string;
}

interface Props {
  area: string;
  hideModal: () => void;
  me: IMe;
  match: {
    params: {
      projectURL?: string;
      areaURL?: string;
    };
  };
}

export default withRouter(withMe(AddPost));
