import styled from 'styled-components';
import { Card } from 'antd';

export const CardStyled = styled(Card)`
  min-width: 300px;
`;

export const HeadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.img`
  width: 150px;
`;
