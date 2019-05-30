import styled from 'styled-components';
import get from 'styles/getStyle';

export const CardBaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${get('space-32')};

  h3.ant-typography {
    margin-bottom: ${get('space-24')};
  }
`;
