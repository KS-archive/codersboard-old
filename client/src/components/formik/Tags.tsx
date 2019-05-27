import React from 'react';
import { Select, Form } from 'antd';
import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';
import withMaterialTags, { MaterialTag as Tag } from 'pages/Materials/store/withTags';

type Props = { autoComplete?: string; materialTags: Tag[] } & FormItemProps & SelectProps & FieldProps;

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
        style={props.style}
        placeholder={props.placeholder}
        allowClear={props.allowClear}
        autoFocus={props.autoFocus}
        defaultActiveFirstOption={props.defaultActiveFirstOption}
        disabled={props.disabled}
        filterOption={props.filterOption}
        notFoundContent={props.notFoundContent}
        showSearch={props.showSearch}
        size={props.size}
        onSelect={props.onChange}
        onChange={value => form.setFieldValue(field.name, value)}
        onBlur={field.onBlur}
      >
        {materialTags ? renderTags(materialTags) : <Option key="1">''</Option>}
      </Select>
    </Item>
  );
};

export default withMaterialTags(Tags);
