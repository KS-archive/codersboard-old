import styled from 'styled-components';
import get from 'styles/getStyle';

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${get('space-16')};

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
