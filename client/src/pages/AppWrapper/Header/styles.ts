import styled from 'styled-components';
import { Layout, Menu as AntdMenu } from 'antd';
import get from 'styles/getStyle';

export const HeaderContainer = styled(Layout.Header)`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: ${get('color-grayscale-white')};
  border-bottom: ${get('border-light')};
  padding: 0 ${get('space-24')};
  z-index: 1;

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

  .ant-btn {
    margin-right: ${get('space-24')};

    a {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`;

export const Name = styled.p`
  margin-left: ${get('space-4')};
`;

export const Menu = styled(AntdMenu)`
  border-style: none;
`;

export const MenuItem = styled(AntdMenu.Item)`
  border-style: none;
`;
