import React from 'react';
import { Typography } from 'antd';
import MembersTable from './MembersTable';
import users from 'mocks/users';
import * as styles from './styles';

const { MembersContainer, Header, Search } = styles;
const { Title } = Typography;

const Members = () => {
  return (
    <MembersContainer>
      <Header>
        <Title level={2}>Członkowie</Title>
        <Search placeholder="Wyszukaj członków" onSearch={value => console.log(value)} />
      </Header>
      <MembersTable data={users} />
    </MembersContainer>
  );
};

export default Members;
