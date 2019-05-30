import styled from 'styled-components';
import { Button } from 'antd';
import get from 'styles/getStyle';

export const MaterialsContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: ${get('space-16')};
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  padding: ${get('space-24')} 0;

  > a {
    align-self: stretch;
  }

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
