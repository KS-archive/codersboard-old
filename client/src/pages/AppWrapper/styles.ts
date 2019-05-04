import styled from 'styled-components';
import { Layout } from 'antd';
import get from 'styles/getStyle';

export const Container = styled(Layout)`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${get('color', 'background')};
`;

export const RightColumn = styled(Layout)`
  border-style: none;
`;

export const Content = styled(Layout.Content)`
  margin: 0 ${get('space', 'md')};
`;

export const ContentCard = styled.div`
  padding: ${get('space', 'lg')};
  background-color: ${get('color', 'white')};
  border-radius: ${get('radius')};
`;
