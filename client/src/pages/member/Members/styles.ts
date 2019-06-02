import styled from 'styled-components';
import get from 'styles/getStyle';

export const MembersTableContainer = styled.div`
  width: calc(100% + 64px);
  height: calc(100vh - 64px);
  margin: calc(0px - ${get('space-32')});

  .ag-react-container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .ag-cell {
    display: flex;
    align-items: center;
    color: ${get('color-text-regular')};
    font-size: ${get('font-size-14')};
  }
`;
