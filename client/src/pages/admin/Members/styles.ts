import styled from 'styled-components';
import { Button } from 'antd';
import get from 'styles/getStyle';

export const MembersContainer = styled.div`
  border-style: none;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${get('space-32')};
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;

