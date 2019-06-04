import React from 'react';
import { Form, DatePicker } from 'antd';
import moment, { MomentInput } from 'moment';
import { FieldProps } from 'formik/dist/Field';
import { DatePickerProps } from 'antd/es/date-picker/interface';
import { FormItemProps } from 'antd/es/form';

import { getStatus } from 'components/formik/helpers';

type Props = FormItemProps & DatePickerProps & FieldProps;

const FormikInput = ({ form, field: { name, onChange, onBlur, value }, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);
  const handleChange = (momentDate: MomentInput, dateString: string) => {
    form.setFieldValue(name, dateString);
  };

  return (
    <Form.Item
      label={props.label}
      required={props.required}
      validateStatus={validateStatus}
      help={help}
      colon={props.colon}
    >
      <DatePicker
        name={name}
        value={value ? moment(value) : undefined}
        onChange={handleChange}
        format="DD.MM.YY, HH:mm"
        showToday={false}
        {...props}
      />
    </Form.Item>
  );
};

export default FormikInput;
