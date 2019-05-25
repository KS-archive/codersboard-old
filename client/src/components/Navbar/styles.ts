import styled from 'styled-components';
import { Menu } from 'antd';
import get from 'styles/getStyle';

export const BeforeItems = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: ${get('space-12')} ${get('space-24')};
`;

export const NavbarContainer = styled.div`
  display: flex;
  border-top: 1px solid ${get('color-grayscale-light')};
  border-bottom: 1px solid ${get('color-grayscale-light')};
  background-color: ${get('color-grayscale-white')};
`;

export const NavbarItems = styled(Menu)`
  margin-left: auto;
  border-bottom: none;
  background-color: ${get('color-grayscale-white')};
`;

export const NavItem = Menu.Item;
