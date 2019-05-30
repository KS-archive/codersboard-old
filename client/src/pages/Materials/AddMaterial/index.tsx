import React from 'react';
import { Button, message } from 'antd';
import { Formik, Field, Form, FormikActions } from 'formik';
import * as Yup from 'yup';
import { withMe, MeProps } from 'store/user/queries/Me';
import uploadMaterial from '../store/AddMaterial';
import { uploadToCloudinary } from 'utils';
import { Input, TextArea, Tags, ImageUpload } from 'components/formik';

const initialValues: IFormValues = {
  title: '',
  description: '',
  url: '',
  tags: [],
  image: null,
};

const addPostSchema = Yup.object().shape({
  title: Yup.string().required('Tytuł jest wymagany'),
  description: Yup.string().required('Opis jest wymagana'),
  url: Yup.string()
    .url('To nie jest link')
    .required('Link jest wymagana'),
  tags: Yup.array().required('Tagi są wymagane'),
  image: Yup.mixed().required('Miniaturka jest wymagana'),
});

const AddMaterial = (props: Props) => {
  const handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const { title, url, tags, description, image } = values;

    try {
      const imageUrl = await uploadToCloudinary(image, 'material-image');

      const materialValues = {
        data: {
          title,
          url,
          description,
          image: imageUrl,
          user: {
            connect: {
              id: props.me.id,
            },
          },
          tags: {
            connect: tags.map(tag => ({ id: tag })),
          },
          credential: {},
        },
      };

      actions.resetForm();
      await uploadMaterial(materialValues);
      console.log(materialValues);
      message.success('Materiał został dodany');
    } catch (ex) {
      console.log(ex);
      message.error('Podczas dodawania materiału wystąpił błąd');
    }
    actions.setSubmitting(false);
    props.hideModal();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addPostSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Tytuł" size="large" component={Input} />
          <Field type="text" name="url" label="Link" size="large" component={Input} />
          <Field name="tags" label="Tagi" size="large" component={Tags} />
          <Field type="text" name="description" label="Opis" component={TextArea} />
          <Field type="file" name="image" label="Dodaj miniaturkę" component={ImageUpload} />
          <Button htmlType="submit" size="large" type="primary" block loading={isSubmitting}>
            Dodaj
          </Button>
        </Form>
      )}
    </Formik>
  );
};

interface Props {
  hideModal: Function;
  me: MeProps;
}

interface IFormValues {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: any;
}

export default withMe(AddMaterial);
