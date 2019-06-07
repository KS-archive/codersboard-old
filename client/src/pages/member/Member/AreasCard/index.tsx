import React from 'react';
import { List } from 'antd';
import CardBase from '../CardBase';
import Area from './Area';
import { AreasList } from './styles';

const AreasCard: React.FC<IProps> = ({ areas }) => {
  return (
    <CardBase title="Obszary">
      <AreasList>
        <List rowKey="id" itemLayout="vertical" dataSource={areas} renderItem={area => <Area {...area} />} />
      </AreasList>
    </CardBase>
  );
};

interface IProps {
  areas: {
    id: string;
    area: {
      id: string;
      url: string;
      name: string;
      image: string;
      __typename: 'Area';
    };
    role: string;
    responsibilities: string;
    __typename: 'AreaMember';
  }[];
}

AreasCard.defaultProps = {
  areas: [],
};

export default AreasCard;
