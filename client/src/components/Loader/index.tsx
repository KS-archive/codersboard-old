import React from 'react';
import { Spin } from 'antd';
import { SpinContainer } from './styles';

const Loader = () => {
  return (
    <SpinContainer>
      <Spin tip=" Loading..." size="large" />
    </SpinContainer>
  );
};

export default Loader;
