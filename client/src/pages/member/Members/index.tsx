import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ICellRendererParams, GridApi, GridReadyEvent } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import columns from './columns';
import withUsers, { IWithUsers, IUser } from './store/withUsers';
import calculateRowHeight from './utils/calculateRowHeight';
import filterRows from './utils/filterRows';
import Filter from './Filter';
import { MembersTableContainer } from './styles';

const defaultColDef = {
  resizable: true,
  autoHeight: true,
};

class Table extends PureComponent<IProps> {
  gridApi?: GridApi;
  globalFilter = '';

  setGlobalFilter = (value: string) => {
    this.globalFilter = value.toLowerCase();
    this.gridApi.onFilterChanged();
  }

  handleGridReady = (params: GridReadyEvent) => {
    this.gridApi = params.api;
  }

  render() {
    return (
      <MembersTableContainer className="ag-theme-balham">
        <Filter setGlobalFilter={this.setGlobalFilter} />
        <AgGridReact
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowData={this.props.users}
          getRowHeight={calculateRowHeight}
          rowSelection="multiple"
          onGridReady={this.handleGridReady}
          animateRows
          isExternalFilterPresent={() => true}
          doesExternalFilterPass={(node) => filterRows(node, this.globalFilter)}
        />
      </MembersTableContainer>
    );
  }
}

interface IProps extends IWithUsers {}

export interface IColumn<V = string> extends ICellRendererParams {
  data: IUser;
  value: V;
}

export default withUsers(Table);
