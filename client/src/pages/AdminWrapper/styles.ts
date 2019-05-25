import styled from 'styled-components';
import get from 'styles/getStyle';

export const AdminWrapperContainer = styled.div`
  margin: calc(0px - ${get('space-32')});
`;

export const AdminContent = styled.div`
  margin: ${get('space-32')};
`;

export const Text = styled.p`
  font-weight: bold;
`;
