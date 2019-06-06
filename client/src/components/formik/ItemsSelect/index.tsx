import React from 'react';
import Select from 'react-select';
import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { getStatus } from 'components/formik/helpers';
import { IndicatorProps } from 'react-select/lib/components/indicators';

import MenuList from './MenuList';
import styles, { FormItem, ClearIndicatorIcon, DropdownIndicatorIcon } from './styles';
import { Props } from 'react-select/lib/Select';

const DropdownIndicator: React.FC<IndicatorProps<IItemsSelectOption>> = ({ isFocused }) => (
  <DropdownIndicatorIcon type="down" style={{ transform: `rotate(${isFocused ? '180deg' : 0})` }} />
);

const ClearIndicator: React.FC<IndicatorProps<IItemsSelectOption>> = ({ clearValue }) => (
  <ClearIndicatorIcon type="close-circle" onClick={clearValue} />
);

const ItemsSelect: React.FC<IProps> = ({ form, field: { name, onChange, onBlur, value }, options, ...props }) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);
  const handleChange = (item: IItemsSelectOption | IItemsSelectOption[]) => {
    if (props.isMulti) {
      if (!item) {
        form.setFieldValue(name, []);
      } else {
        form.setFieldValue(name, (item as IItemsSelectOption[]).map(({ value }) => value));
      }
    } else {
      form.setFieldValue(name, (item as IItemsSelectOption).value);
    }
  };

  if (props.isMulti) {
    value = value && value.map((id: string) => options.find(({ value }) => value === id));
  } else {
    value = options.find(option => value === option.value);
  }

  return (
    <FormItem
      label={props.label}
      required={props.required}
      validateStatus={validateStatus}
      help={help}
      colon={props.colon}
    >
      <Select<any>
        name={name}
        components={{ MenuList, DropdownIndicator, ClearIndicator }}
        value={value || []}
        onChange={handleChange}
        onBlur={onBlur}
        isLoading={validateStatus === 'validating' || !options.length}
        options={options}
        styles={styles}
        closeMenuOnSelect={props.closeMenuOnSelect || !props.isMulti}
        {...props}
      />
    </FormItem>
  );
};

export interface IItemsSelectOption {
  label: string;
  value: string;
  image: string;
}

interface IProps extends FormItemProps, FieldProps, Props<any> {
  options: IItemsSelectOption[];
  optionImageWidth: number;
  optionImageHeight: number;
}

export default ItemsSelect;
