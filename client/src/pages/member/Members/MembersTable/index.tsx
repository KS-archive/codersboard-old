import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IUser } from '../store/UsersQuery';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const columnDefs = [
  { field: 'image', headerName: '', checkboxSelection: true },
  { field: 'fullName', headerName: 'Imię i nazwisko' },
  { field: 'role', headerName: 'Rola' },
  { field: 'email', headerName: 'E-mail' },
  { field: 'phone', headerName: 'Telefon' },
  { field: 'university', headerName: 'Uczelnia' },
  { field: 'universityDepartment', headerName: 'Wydział' },
  { field: 'fieldOfStudy', headerName: 'Kierunek' },
];

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
};

let gridApi: any = {};

const onButtonClick = (e: React.MouseEvent) => {
  const selectedNodes = gridApi.getSelectedNodes();
  const selectedData = selectedNodes.map((node: any) => node.data);
  const selectedDataStringPresentation = selectedData.map((user: IUser) => user.fullName).join(', ');
  alert(`Selected nodes: ${selectedDataStringPresentation}`);
};

const Table: React.FC<IProps> = ({ data }) => {
  const users = data ? data.map(user => ({ ...user, usniversity: user.university && user.university.name })) : [];
  console.log(users);

  return (
    <div
      className="ag-theme-material"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <button onClick={onButtonClick}>Get selected rows</button>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={users}
        rowSelection="multiple"
        onGridReady={params => { gridApi = params.api; }}
      />
    </div>
  );
};

interface IProps {
  data?: IUser[];
}

export interface IFormatter<T = string, D = any> {
  dependentValues?: D;
  row: IUser;
  value?: T;
}

export default Table;
