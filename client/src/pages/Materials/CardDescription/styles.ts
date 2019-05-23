import styled from 'styled-components';
import get from 'styles/getStyle';

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > p {
    padding-top: ${get('space-8')};
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: auto;
  margin-left: auto;
  padding-top: ${get('space-16')};

  a path {
    fill: ${get('color-grayscale-white')};
  }

  button path {
    fill: ${get('color-text-secondary')};
  }

  button:hover path {
    fill: ${get('color-primary')};
  }

  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${get('space-12')};
  }
`;
