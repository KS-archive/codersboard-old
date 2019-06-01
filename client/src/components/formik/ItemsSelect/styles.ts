import get from 'styles/getStyle';
import styled from 'styled-components';
import { Form, Icon } from 'antd';

export const FormItem = styled(Form.Item)`
  .ant-form-item-label {
    margin-bottom: ${get('space-4')};
  }

  .ant-select {
    width: 100%;
  }
`;

export const ClearIndicatorIcon = styled(Icon)`
  color: #000;
  font-size: ${get('font-size-14')};
  margin-right: ${get('space-8')};
  opacity: 0.25;
  transition: opacity 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
`;

export const DropdownIndicatorIcon = styled(Icon)`
  color: rgba(0,0,0,0.25);
  font-size: ${get('font-size-12')};
  transition: transform 0.3s;
`;

export default {
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    overflow: 'unset',
    padding: `0 ${get('space-12')}`,
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    height: 24,
    margin: 0,
    '& > div': {
      height: 24,
    },
    '& input': {
      position: 'relative',
      top: -10,
      height: 24,
    },
  }),
  option: (provided: any, state: any) => {
    const width = state.selectProps.optionImageWidth || 24;
    const height = state.selectProps.optionImageHeight || 24;
    return {
      ...provided,
      position: 'relative',
      height: height <= 32 ? 40 : height + 8,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: width + 24,
      '&::before': {
        content: "''",
        position: 'absolute',
        top: get('space-8'),
        left: get('space-12'),
        width,
        height,
        borderRadius: get('radius-4'),
        background: `url('${state.data.image}') no-repeat center/cover`,
      },
    };
  },
  placeholder: (provided: any, state: any) => ({
    ...provided,
    position: 'static',
    whiteSpace: 'nowrap',
    width: 0,
    height: 20,
  }),
  control: (provided: any, state: any) => {
    return ({
      ...provided,
      borderColor: '#d9d9d9',
      boxShadow: 'none',
      minHeight: 32,
      '&:hover': {
        borderColor: get('color-primary'),
      }
    })
  },
  indicatorsContainer: (provided: any, state: any) => {
    return ({
      ...provided,
      height: 30,
      paddingRight: get('space-12'),
      '> div': {
        padding: get('space-4'),
      }
    })
  },
  indicatorSeparator: () => ({
    display: 'none',
  }),
  multiValueLabel: (provided: any, state: any) => {
    const width = state.selectProps.optionImageWidth || 24;
    const height = state.selectProps.optionImageHeight || 24;
    return {
      ...provided,
      height,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingLeft: width + 8,
      '&::before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        borderRadius: `${get('radius-4')} 0 0 ${get('radius-4')}`,
        background: `url('${state.data.image}') no-repeat center/cover`,
      },
    };
  },
  singleValue: (provided: any, state: any) => {
    const width = state.selectProps.optionImageWidth || 24;
    const height = state.selectProps.optionImageHeight || 24;
    return {
      ...provided,
      height,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingLeft: width + 8,
      transform: 'none',
      '&::before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        borderRadius: get('radius-4'),
        background: `url('${state.data.image}') no-repeat center/cover`,
      },
    };
  },
};
