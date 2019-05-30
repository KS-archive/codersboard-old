import styled from 'styled-components';
import get from 'styles/getStyle';

export const Columns = styled.div`
  display: flex;

  > div + div {
    width: 100%;
    margin-left: ${get('space-48')};
  }
`;


export const Column = styled.div`
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: ${get('space-24')};
  }
`;

