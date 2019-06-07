import styled from 'styled-components';
import get from 'styles/getStyle';

export const AreasList = styled.div`
  display: grid;
  grid-gap: ${get('space-24')};
  grid-template-columns: repeat(2, 1fr);
`;
