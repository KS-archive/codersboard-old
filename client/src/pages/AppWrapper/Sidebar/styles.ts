import styled from 'styled-components';
import { Layout, Menu as AntdMenu } from 'antd';
import get from 'styles/getStyle';

export const SidebarContainer = styled(Layout.Sider)`
  background-color: ${get('color', 'black')};
`;

export const LogoWrapper = styled.div`
  width: 100%;
  padding: ${get('space', 'md')};

  svg {
    width: 100%;
  }
`;

export const Menu = styled(AntdMenu)`
  background-color: transparent;
  border: none;

  &.ant-menu-inline-collapsed {
    span {
      visibility: hidden;
    }
  }
`;

export const MenuItem = styled(AntdMenu.Item)`
  &.ant-menu-item {
    > a {
      display: flex;
      align-items: center;
      color: ${get('color', 'white')};

      span {
        margin-left: ${get('space', 'md')};
      }
    }

    &.ant-menu-item-selected {
      background-color: ${get('color', 'primary')}
    }
  }
`;
