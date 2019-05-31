import styled from 'styled-components';
import get from 'styles/getStyle';

export const Title = styled.div<{ integrated: boolean }>`
  display: flex;
  align-items: center;

  p {
    font-size: ${get('font-size-12')};
    margin: 0 ${get('space-8')} 0 0;
  }

  div {
    width: 8px;
    height: 8px;
    background-color: ${props => (props.integrated ? get('color-success') : get('color-danger'))};
    border-radius: 100%;
  }
`;
