import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { AreaContainer, Image, Content } from './styles';

const { Meta } = Card;

const Area: React.FC<IProps> = ({ role, responsibilities, area: { url, name, image } }) => {
  return (
    <AreaContainer>
      <Meta avatar={<Image src={image} />} title={<Link to={`/areas/${url}`}>{name}</Link>} description={role} />
      <Content>{responsibilities}</Content>
    </AreaContainer>
  );
};

interface IProps {
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
}

export default Area;
