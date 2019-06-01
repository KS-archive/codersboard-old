import styled from 'styled-components';
import { Layout } from 'antd';
import get from 'styles/getStyle';

export const Container = styled(Layout)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${get('color-background')};
`;

export const RightColumn = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hodden;
`;

export const Content = styled.div`
  padding-top: ${get('space-64')};
  margin: ${get('space-32')};
`;
