import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';

import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';

import { getStatus } from 'components/formik/helpers';

const Option = Select.Option;

const FormItem = styled(Form.Item)`
  .ant-select {
    width: 100%;
  }
`;

export interface IOption {
  value: string;
  label?: string;
}

const FormikSelect = ({ form, field: { name, onChange, onBlur, value }, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);
  const handleChange = (value: any) => {
    form.setFieldValue(name, value);
  };

  return (
    <FormItem
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
    </FormItem>
  );
};

type Props = { name: string; options: IOption[] } & FormItemProps & SelectProps & FieldProps;

export default FormikSelect;
