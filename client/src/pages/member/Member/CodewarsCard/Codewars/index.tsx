import React from 'react';
import { Card, Typography, List } from 'antd';
import { Container } from './styles';

const { Title } = Typography;
const { Item } = List;

const Codewars: React.FC<IProps> = ({ label, value }) => {
  return (
    <Item>
      <Card title={<Container>{label}</Container>} style={{ minWidth: '300px' }}>
        <Container>
          <Title level={2}>{value}</Title>
        </Container>
      </Card>
    </Item>
  );
};

interface IProps {
  label: string;
  value: string;
}

export default Codewars;
