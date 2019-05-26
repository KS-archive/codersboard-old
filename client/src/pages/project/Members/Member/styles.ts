import styled from 'styled-components';
import { List } from 'antd';
import get from 'styles/getStyle';

export const MemberContainer = styled(List.Item)`
  #root & {
    padding: ${get('space-16')};
    border: ${get('border-light')};
    margin: ${get('space-16')};
    background-color: ${get('color-grayscale-white')};
    border-radius: ${get('radius-4')};

    h4 {
      margin: 0;

      a {
        font-size: ${get('font-size-16')};
        line-height: ${get('font-size-18')};
        font-weight: bold;
        color: ${get('color-text-primary')};
      }
    }

    .ant-list-item-action {
      display: flex;
      justify-content: flex-end;
      margin: ${get('space-16')} 0 0 auto;

      li {
        transition: color 0.3s;
        cursor: pointer;

        &:hover {
          color: ${get('color-primary')};
        }
      }
    }
  }
`;

export const Content = styled.p`
  margin-top: ${get('space-8')};
`;
