import styled from 'styled-components';
import { Button } from 'antd';
import get from 'styles/getStyle';

export const MembersContainer = styled.div`
  width: 100%;

  .ant-list-items {
    display: grid;
    grid-gap: ${get('space-32')};
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 1600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 992px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${get('space-24')};
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;
