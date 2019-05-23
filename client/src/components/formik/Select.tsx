import React from 'react';
import { Form, Select } from 'antd';
import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';

const Option = Select.Option;

export interface IOption {
  value: string;
  label?: string;
}

const getStatus = (form: any, errorMessage: any) => {
  if (errorMessage) {
    return 'error';
  } else if (form.isSubmitting || form.isValidating) {
    return 'validating';
  }
  return undefined;
};

const FormikSelect = ({ form, field: { name, onChange, onBlur, value }, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage);
  const handleChange = (value: any) => {
    form.setFieldValue(name, value);
  };
  return (
    <Form.Item
      label={props.label}
      required={props.required}
      validateStatus={validateStatus}
      help={help}
      colon={props.colon}
    >
      <Select
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        loading={validateStatus === 'validating'}
        {...props}
      >
        {props.options.map(option => (
          <Option key={option.value}>{option.label || option.value}</Option>
        ))}
      </Select>
    </Form.Item>
  );
};

type Props = { name: string; options: IOption[] } & FormItemProps & SelectProps & FieldProps;

export default FormikSelect;
