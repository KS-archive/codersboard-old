import styled from 'styled-components';
import { Menu } from 'antd';
import get from 'styles/getStyle';

export const Container = styled.div`
  display: flex;
  box-shadow: ${get('shadow-small')};
  background-color: ${get('color-grayscale-white')};
  padding: ${get('space-16')} 0;
`;

export const Content = styled.div`
  width: 100%;
  padding: ${get('space-16')} ${get('space-32')};
`;

export const MenuItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  transition: none;


  &:hover,
  &.ant-menu-item-selected {
    path {
      fill: ${get('color-primary')};
    }
  }
`;

export const Text = styled.p`
  margin-left: ${get('space-12')};
`;
