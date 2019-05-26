import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { IUser } from '../store/UsersQuery';
import * as styles from './styles';

const { TableContainer, TableColumn } = styles;

const Table = ({ data }: Props) => {
  return (
      <TableContainer dataSource={data} scroll={{ x: true }} rowKey="id">
        <TableColumn
          fixed
          title=""
          dataIndex="image"
          className="image"
          render={(image) => <Avatar size={32} src={image} />}
        />
        <TableColumn fixed title="Imię i nazwisko" dataIndex="fullName" className="fullName" render={(fullName, { profileURL }) => (
          <Link to={`/members/${profileURL}`}>{fullName}</Link>
        )} />
        <TableColumn title="Rola" dataIndex="role" className="role" />
        <TableColumn title="E-mail" dataIndex="email" className="email" />
        <TableColumn title="Telefon" dataIndex="phone" className="phone" />
        <TableColumn title="Uczenia" dataIndex="university.name" className="university" />
        <TableColumn title="Wydział" dataIndex="universityDepartment" className="universityDepartment" />
        <TableColumn title="Kierunek" dataIndex="fieldOfStudy" className="fieldOfStudy" />
      </TableContainer>
  );
};

interface Props {
  data?: IUser[];
}

export default Table;
