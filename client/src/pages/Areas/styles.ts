import styled from 'styled-components';
import { Button, Card } from 'antd';
import get from 'styles/getStyle';

export const AreasContainer = styled.div`
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
  grid-gap: ${get('space', 'lg')};
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  padding: ${get('space', 'lg')} 0;

  > a {
    align-self: stretch;
  }

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const AreaCard = styled(Card)`
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

    .ant-card-meta-title {
      margin-bottom: 0;
      font-size: ${get('size', 'lg')};
      font-weight: bold;
      white-space: normal;
    }

    .ant-card-meta-description {
      flex: 1;
    }
  }
`;

interface CoverImageProps {
  src: string;
}

export const CoverImage = styled.div<CoverImageProps>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56%;
  background: url('${props => props.src}') no-repeat center/cover;
  border-radius: ${get('radius')} ${get('radius')} 0 0;
`;
