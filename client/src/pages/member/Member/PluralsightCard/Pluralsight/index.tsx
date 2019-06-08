import React from 'react';
import { Typography } from 'antd';
import { IPluralsight } from '../index';
import { HeadContainer, BodyContainer, CardItem, Logo, CardStyled } from './styles';

const { Title } = Typography;

const Pluralsight: React.FC<IProps> = ({ id, title, thumbnailUrl, score, percentile, level }) => {
  return (
    <>
      <CardStyled
        cover={
          <HeadContainer>
            <Logo src={thumbnailUrl} alt={id} />
            <Title level={2}>{title}</Title>
          </HeadContainer>
        }
      >
        <BodyContainer>
          <CardItem>
            <Title level={4}>Score</Title>
            {score}
          </CardItem>
          <CardItem>
            <Title level={4}>%</Title>
            {Math.round(percentile * 100) / 100}
          </CardItem>
          <CardItem>
            <Title level={4}>Level</Title>
            {level}
          </CardItem>
        </BodyContainer>
      </CardStyled>
    </>
  );
};

interface IProps extends IPluralsight {}

export default Pluralsight;
