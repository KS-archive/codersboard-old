import React from 'react';
import { Button, message } from 'antd';
import { Formik, Field, Form, FormikActions } from 'formik';
import * as Yup from 'yup';
import withMe, { IMe } from 'components/Posts/store/withMe';
import withAreas, { IArea } from 'pages/area/Areas/store/withAreas';
import { uploadToCloudinary } from 'utils';
import { Input, TextArea, Tags, ImageUpload, Select } from 'components/formik';
import uploadMaterial from '../store/AddMaterial';

const initialValues: IFormValues = {
  title: '',
  description: '',
  url: '',
  tags: [],
  image: '',
  area: '',
};

const areasOptions = (areas: IArea[]) => {
  return areas.map(area => ({
    value: area.id,
    label: area.name,
  }));
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
    const { tags, image, area } = values;
    try {
      const imageUrl = await uploadToCloudinary(image, 'material-image');
      const materialValues = {
        data: {
          ...values,
          image: imageUrl,
          tags: {
            connect: tags.map(tag => ({ id: tag })),
          },
          credential: {},
          area: {
            connect: {
              id: area,
            },
          },
        },
      };

      actions.resetForm();
      await uploadMaterial(materialValues);
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
          <Field name="title" label="Tytuł" size="large" component={Input} />
          <Field name="url" label="Link" size="large" component={Input} />
          <Field name="area" label="Obszar" size="large" component={Select} options={areasOptions(props.areas)} />
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
  me: IMe;
  areas: IArea[];
}

interface IFormValues {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: any;
  area: string;
}

export default withAreas(withMe(AddMaterial));
