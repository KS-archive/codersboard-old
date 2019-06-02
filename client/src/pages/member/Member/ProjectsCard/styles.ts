import styled from 'styled-components';
import get from 'styles/getStyle';

export const ProjectsList = styled.div`
  width: 100%;

  .ant-list-items {
    display: grid;
    grid-gap: ${get('space-24')};
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 1440px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
