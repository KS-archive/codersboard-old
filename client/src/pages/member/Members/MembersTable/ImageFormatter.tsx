import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { IFormatter } from '.';

const ImageFormatterCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ImageFormatter: React.FC<IFormatter> = ({ value }) => {
  return (
    <ImageFormatterCell>
      <Avatar src={value} />
    </ImageFormatterCell>
  );
};

export default ImageFormatter;
