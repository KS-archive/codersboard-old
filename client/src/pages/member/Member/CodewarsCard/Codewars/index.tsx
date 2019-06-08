import React from 'react';
import { Typography } from 'antd';
import { Container, CardStyled } from './styles';

const { Title } = Typography;

const Codewars: React.FC<IProps> = ({ label, value }) => {
  return (
    <CardStyled title={<Container>{label}</Container>}>
      <Container>
        <Title level={2}>{value}</Title>
      </Container>
    </CardStyled>
  );
};

interface IProps {
  label: string;
  value: string;
}

export default Codewars;
