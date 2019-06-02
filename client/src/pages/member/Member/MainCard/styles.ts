import styled from 'styled-components';
import get from 'styles/getStyle';

export const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding: ${get('space-24')};
  border: ${get('border-light')};
  border-radius: ${get('radius-4')};
  background-color: ${get('color-grayscale-white')};
`;

export const Image = styled.div<{ src: string }>`
  width: 160px;
  height: 160px;
  min-width: 160px;
  min-height: 160px;
  border-radius: ${get('radius-4')};
  background: url('${props => props.src}') no-repeat center/cover;
`;

export const FullName = styled.h2`
  padding-top: ${get('space-16')};
  margin: 0;
  font-size: ${get('font-size-32')};
  font-weight: bold;
  color: ${get('color-text-primary')};
`;

export const Role = styled.h3`
  padding-bottom: ${get('space-16')};
  margin: 0;
  font-size: ${get('font-size-18')};
  font-weight: bold;
  color: ${get('color-primary')};
`;

export const DataRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${get('space-12')};
  font-size: ${get('font-size-14')};
  line-height: 22px;
  color: ${get('color-text-regular')};

  strong {
    min-width: 80px;
    margin-right: ${get('space-8')};
    font-weight: bold;
  }

  p {
    font-weight: normal;
  }

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
