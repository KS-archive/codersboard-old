import { css } from 'styled-components';
import get from 'styles/getStyle';

export default css`
  h1.ant-typography,
  h2.ant-typography,
  h3.ant-typography,
  h4.ant-typography,
  h5.ant-typography,
  h6.ant-typography {
    margin: 0;
  }

  .ant-tooltip-inner > a > div {
    display: none;
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

  .ant-modal-confirm-content {
    white-space: pre-line;
  }
`;
