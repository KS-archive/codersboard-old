import styled from 'styled-components';
import get from 'styles/getStyle';

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${get('space-32')};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;
