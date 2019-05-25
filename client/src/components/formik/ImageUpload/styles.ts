import styled from 'styled-components';
import { Upload } from 'antd';
import get from 'styles/getStyle';

export const ImageUploader = styled(Upload)`
  display: block;
  margin-top: ${get('space-4')};
  min-width: 128px;
  min-height: 128px;
  max-width: 128px;
  max-height: 128px;

  .ant-upload.ant-upload-select-picture-card > .ant-upload {
    display: block;
    height: auto;
  }

  .ant-upload {
    box-sizing: border-box;
    margin: 0;
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
