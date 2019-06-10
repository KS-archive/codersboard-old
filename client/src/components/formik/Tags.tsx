import React from 'react';
import { Select, Form } from 'antd';
import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';
import withMaterialTags, { MaterialTag as Tag } from 'pages/Materials/store/withMaterialTags';

type Props = { name: string; options: IOption[]; materialTags: Tag[] } & FormItemProps & SelectProps & FieldProps;

const { Option } = Select;
const { Item } = Form;

const getStatus = (form: any, errorMessage: any) => {
  if (errorMessage) {
    return 'error';
  } else if (form.isSubmitting || form.isValidating) {
    return 'validating';
  }
  return null;
};

const Tags = ({ materialTags, form, field, ...props }: Props) => {
  const errorMessage = form.touched[field.name] && form.errors[field.name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage);

  const renderTags = (tags: Tag[]) => {
    return tags.map((tag: Tag) => (
      <Option key={tag.id} value={tag.id}>
        {tag.name}
      </Option>
    ));
  };

  return (
    <Item label={props.label} required={props.required} validateStatus={validateStatus} help={help} colon={props.colon}>
      <Select
        mode="tags"
        name={field.name}
        value={field.value}
        onChange={(value: any) => form.setFieldValue(field.name, value)}
        onBlur={field.onBlur}
        loading={validateStatus === 'validating'}
        {...props}
      >
        {materialTags ? renderTags(materialTags) : <Option key="1">''</Option>}
      </Select>
    </Item>
  );
};

export interface IOption {
  value: string;
  label?: string;
}

export default withMaterialTags(Tags);
