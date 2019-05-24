import styled from 'styled-components';
import get from 'styles/getStyle';

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${get('space-32')};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  button:last-of-type {
    margin-left: ${get('space-16')};
  }
`;
