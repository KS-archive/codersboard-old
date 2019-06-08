import styled from 'styled-components';
import get from 'styles/getStyle';

export const PluralsightList = styled.div`
  display: grid;
  grid-gap: ${get('space-24')};
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
