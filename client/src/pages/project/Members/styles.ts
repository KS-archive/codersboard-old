import styled from 'styled-components';
import { Button } from 'antd';
import get from 'styles/getStyle';

export const MembersContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${get('space-24')};
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;
