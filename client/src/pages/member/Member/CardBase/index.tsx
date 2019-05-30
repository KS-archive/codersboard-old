import React from 'react';
import { Typography } from 'antd';
import { CardBaseContainer } from './styles';

const { Title } = Typography;

const CardBase: React.FC<IProps> = ({ title, children }) => {
  return (
    <CardBaseContainer>
      <Title level={3}>{title}</Title>
      {children}
    </CardBaseContainer>
  );
};

interface IProps {
  title: string;
  children: React.ReactNode;
}

export default CardBase;
