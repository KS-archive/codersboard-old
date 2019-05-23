import styled from 'styled-components';
import get from 'styles/getStyle';

export const SelectWrapper = styled.div`
  display: flex;

  button {
    margin-left: ${get('space-24')};

    & + button {
      margin-left: ${get('space-16')};
    }
  }
`;

export const SkillsWrapper = styled.div`
  display: grid;
  grid-gap: ${get('space-24')};
  grid-template-columns: repeat(2, 1fr);
  padding: ${get('space-24')} 0;

  @media (max-width: 1440px) {
    grid-template-columns: 1fr;
  }
`;
