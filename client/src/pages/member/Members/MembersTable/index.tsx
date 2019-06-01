import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import ReactDataGrid from 'react-data-grid';
import { AppWidthContext } from 'utils/context';
import { IUser } from '../store/UsersQuery';
// import * as styles from './styles';

import ImageFormatter from './ImageFormatter';
import UniversityFormatter from './UniversityFormatter';

const defaultColumnProperties = {
  resizable: true,
  width: 160,
};

const columns = [
  { key: 'image', name: '', formatter: ImageFormatter, width: 48, frozen: true },
  { key: 'fullName', name: 'Imię i nazwisko', frozen: true },
  { key: 'role', name: 'Rola' },
  { key: 'email', name: 'E-mail' },
  { key: 'phone', name: 'Telefon' },
  { key: 'university', name: 'Uczelnia', formatter: UniversityFormatter },
  { key: 'universityDepartment', name: 'Wydział' },
  { key: 'fieldOfStudy', name: 'Kierunek' },
].map(c => ({ ...defaultColumnProperties, ...c }));

const Table: React.FC<IProps> = ({ data }) => {
  const appWidth = useContext(AppWidthContext);
  const users = data ? data : [];

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => users[i]}
      rowsCount={users.length}
      minHeight={window.innerHeight - 64}
      rowHeight={48}
      minWidth={appWidth + 64}
    />
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
