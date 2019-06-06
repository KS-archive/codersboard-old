import styled from 'styled-components';
import { List } from 'antd';
import get from 'styles/getStyle';

export const AreaContainer = styled(List.Item)`
  #root & {
    display: flex;
    flex-direction: column;
    padding: ${get('space-24')};
    border: ${get('border-light')};
    background-color: ${get('color-grayscale-white')};
    border-radius: ${get('radius-4')};

    .ant-card-meta {
      display: flex;
      align-items: center;
    }

    .ant-card-meta-title {
      margin: 0;
    }

    a {
      margin: 0;
      font-size: ${get('font-size-18')};
      line-height: ${get('font-size-24')};
      font-weight: bold;
      color: ${get('color-text-primary')};
    }

    .ant-card-meta-description {
      font-size: ${get('font-size-16')};
      line-height: ${get('font-size-18')};
      font-weight: 500;
      color: ${get('color-primary')};
    }

    .ant-list-item-action {
      display: flex;
      justify-content: flex-end;
      padding-top: ${get('space-16')};
      margin: auto 0 0 auto;

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

export const Image = styled.div<{ src: string }>`
  width: 120px;
  height: 0;
  padding-top: 56%;
  border-radius: ${get('radius-4')};
  background: url('${props => props.src}') no-repeat center/cover;
`;

export const Content = styled.p`
  margin-top: ${get('space-16')};
  white-space: pre-line;
`;
