import { css } from 'styled-components';
import get from 'styles/getStyle';

export default css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  .ant-form-item-label {
    line-height: 1.5;
  }

  .ant-table-scroll table .ant-table-fixed-columns-in-body {
    visibility: visible;
  }

  .ant-card {
    border-radius: ${get('radius-4')};
  }

  .ant-card-cover,
  .ant-card-cover > img {
    border-radius: ${get('radius-4')} ${get('radius-4')} 0 0;
  }

  .ant-card-actions {
    border-radius: 0 0 ${get('radius-4')} ${get('radius-4')};
  }
`;
