import styled from 'styled-components';
import get from 'styles/getStyle';

export const CodewarsList = styled.div`
  display: grid;
  grid-gap: ${get('space-24')};
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;
