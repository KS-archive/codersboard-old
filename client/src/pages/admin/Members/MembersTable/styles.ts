import styled from 'styled-components';
import { Table } from 'antd';
import get from 'styles/getStyle';

export const TableContainer = styled(Table)`
  td {
    vertical-align: middle;
  }

  .image {
    max-width: 56px;
    min-width: 56px;
    padding-right: ${get('space', 'xs')};
  }

  .fullName {
    min-width: 184px;
    max-width: 184px;
    font-weight: 700;

    a {
      cursor: pointer;
    }
  }

  .role {
    min-width: 240px;
  }

  .phone {
    min-width: 120px;
    max-width: 120px;
  }

  .university {
    min-width: 200px;
  }

  .universityDepartment {
    min-width: 200px;
  }

  .fieldOfStudy {
    min-width: 200px;
  }
`;

export const TableColumn = Table.Column;
