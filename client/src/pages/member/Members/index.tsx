import React from 'react';
import MembersTable from './MembersTable';
import UsersQuery from './store/UsersQuery';
import * as styles from './styles';

const { MembersContainer } = styles;

const Members = () => (
  <MembersContainer>
    <UsersQuery>{({ data }) => <MembersTable data={data.users} />}</UsersQuery>
  </MembersContainer>
);

export default Members;
