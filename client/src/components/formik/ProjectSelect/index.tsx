import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';

import { getStatus } from 'components/formik/helpers';

import withProjects, { IWithProjects } from './withProjects';
import { OptionContent, Image, Text } from './styles';

const Option = Select.Option;

const FormItem = styled(Form.Item)`
  .ant-select {
    width: 100%;
  }
`;

const ProjectSelect = ({ form, field: { name, onChange, onBlur, value }, projects = [], projectsLoading, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);
  const handleChange = (value: any) => {
    form.setFieldValue(name, value);
  };

  if (projectsLoading) {
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
        loading={validateStatus === 'validating' || projectsLoading}
        {...props}
      >
        {projects.map(project => (
          <Option key={project.id} title={project.name}>
            <OptionContent>
              <Image src={project.image} />
              <Text>{project.name}</Text>
            </OptionContent>
          </Option>
        ))}
      </Select>
    </FormItem>
  );
};

type Props = { name: string } & FormItemProps & SelectProps & FieldProps & IWithProjects;

export default withProjects(ProjectSelect);
