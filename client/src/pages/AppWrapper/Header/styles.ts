import styled from 'styled-components';
import { Layout, Menu as AntdMenu } from 'antd';
import get from 'styles/getStyle';

export const HeaderContainer = styled(Layout.Header)`
  display: flex;
  align-items: center;
  background-color: ${get('color', 'white')};
  padding: 0 ${get('space', 'lg')};

  svg {
    cursor: pointer;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  .ant-dropdown-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const Name = styled.p`
  margin-left: ${get('space', 'xs')};
`;

export const Menu = styled(AntdMenu)`
  border-style: none;
`;

export const MenuItem = styled(AntdMenu.Item)`
  border-style: none;
`;
