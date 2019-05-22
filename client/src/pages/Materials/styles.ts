import styled from 'styled-components';
import { Button, Card } from 'antd';
import Lock from 'static/fa/solid/lock.svg';
import get from 'styles/getStyle';

export const MaterialsContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: ${get('space-16')};
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  padding: ${get('space-24')} 0;

  > a {
    align-self: stretch;
  }

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MaterialCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-card-body {
    flex: 1;
  }

  .ant-card-meta {
    height: 100%;

    .ant-card-meta-detail {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ant-card-meta-description {
      flex: 1;
    }
  }

  .ant-card-meta-title {
    white-space: normal;
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

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > div {
    margin-top: auto;
    padding-top: ${get('space-16')};
  }
`;
