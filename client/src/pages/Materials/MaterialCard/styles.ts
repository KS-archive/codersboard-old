import styled from 'styled-components';
import { Card } from 'antd';
import Lock from 'static/fa/solid/lock.svg';
import get from 'styles/getStyle';

export const MaterialCardContainer = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: default;
  filter: ${props => !props.hoverable && 'grayscale(80%)'};

  .ant-card-body {
    flex: 1;
  }

  .ant-card-meta {
    height: 100%;

    .ant-card-meta-detail {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: unset;
    }

    .ant-card-meta-description {
      flex: 1;
    }
  }

  .ant-card-meta-title {
    white-space: normal;
    overflow: unset;
  }
`;

interface CoverImageProps {
  locked: boolean;
  src: string;
}

export const CoverImage = styled.div<CoverImageProps>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56%;
  background: url('${props => props.src}') no-repeat center/cover;
  border-radius: ${get('radius-4')} ${get('radius-4')} 0 0;

  &::before {
    content: '';
    position: absolute;
    top: ${get('space-32')};
    bottom: ${get('space-32')};
    left: ${get('space-32')};
    right: ${get('space-32')};
    background: url('${Lock}') no-repeat center/contain;
    visibility: ${props => (props.locked ? 'visible' : 'hidden')};
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${get('color-grayscale-white')};
    visibility: ${props => (props.locked ? 'visible' : 'hidden')};
    opacity: 0.2;
  }
`;
