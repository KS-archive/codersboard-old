import React from 'react';
import { TextAreaProps } from 'antd/es/input';
import { FieldProps } from 'formik/dist/Field';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';

type Props = { autoComplete?: string } & FieldProps & FormItemProps & TextAreaProps;

const { Item } = Form;
const { TextArea } = Input;

const getStatus = (form: any, errorMessage: any) => {
  if (errorMessage) {
    return 'error';
  } else if (form.isSubmitting || form.isValidating) {
    return 'validating';
  }
  return null;
};

const FormikTextArea = ({ form, field: { name, onChange, onBlur, value }, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage);
  return (
    <Item label={props.label} required={props.required} validateStatus={validateStatus} help={help} colon={props.colon}>
      <TextArea
        name={name}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
        id={props.id}
        value={value}
        rows={4}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Item>
  );
};

export default FormikTextArea;
