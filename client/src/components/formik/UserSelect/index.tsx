import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';

import { getStatus } from 'components/formik/helpers';

import withUsers, { IWithUsers } from './withUsers';
import { OptionContent, Image, Text } from './styles';

const Option = Select.Option;

const FormItem = styled(Form.Item)`
  .ant-select {
    width: 100%;
  }
`;

const UserSelect = ({ form, field: { name, onChange, onBlur, value }, users = [], usersLoading, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);
  const handleChange = (value: any) => {
    form.setFieldValue(name, value);
  };

  if (usersLoading) {
    value = undefined;
  }

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
        loading={validateStatus === 'validating' || usersLoading}
        {...props}
      >
        {users.map(user => (
          <Option key={user.id} title={user.fullName}>
            <OptionContent>
              <Image src={user.image} />
              <Text>{user.fullName}</Text>
            </OptionContent>
          </Option>
        ))}
      </Select>
    </FormItem>
  );
};

type Props = { name: string } & FormItemProps & SelectProps & FieldProps & IWithUsers;

export default withUsers(UserSelect);
