import styled from 'styled-components';
import { Typography } from 'antd';
import get from 'styles/getStyle';
import { ImageUpload } from 'components/formik';

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${get('space-32')};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

export const Title = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: ${get('space-12')};
  }
`;

export const Row1 = styled.div`
  display: flex;

  > .ant-row.ant-form-item {
    margin-right: ${get('space-24')};
  }
`;

export const BasicDataColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StudiesDetails = styled.div`
  display: flex;

  .ant-row.ant-form-item {
    flex: 1;

    &:last-child {
      margin-left: ${get('space-24')};
    }

    .ant-input-number {
      width: 100%;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  button:last-of-type {
    margin-left: ${get('space-16')};
  }
`;

export const UserImageUpload = styled(ImageUpload)`
  min-width: 206px;
  min-height: 206px;
  max-width: 206px;
  max-height: 206px;
`;
