import styled from 'styled-components';
import get from 'styles/getStyle';
export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

export const Text = styled.p`
  margin-left: ${get('space-8')};
`;
