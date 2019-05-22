import styled from 'styled-components';
import { Menu } from 'antd';
import get from 'styles/getStyle';

export const NavbarContainer = styled(Menu)`
  border-top: 1px solid ${get('color-grayscale-light')};
`

export const NavItem = Menu.Item;
