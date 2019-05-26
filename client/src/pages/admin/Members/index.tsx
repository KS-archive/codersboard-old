import React from 'react';
import { Typography } from 'antd';
import MembersTable from './MembersTable';
import UsersQuery from './store/UsersQuery';
import * as styles from './styles';

const { MembersContainer, Header, AddButton } = styles;
const { Title } = Typography;

const Members = () => {
  return (
    <MembersContainer>
      <Header>
        <Title level={2}>Członkowie</Title>
        <AddButton type="primary">Dodaj członków</AddButton>
      </Header>
      <UsersQuery>
        {({ data }) => <MembersTable data={data.users} />}
      </UsersQuery>
    </MembersContainer>
  );
};

export default Members;
