import React from 'react';
import Navbar from './Navbar';
import * as styles from './styles';

const { AdminWrapperContainer, AdminContent } = styles;

const adminPaths = ['members', 'universities', 'skills'];

const AdminWrapper = (props: Props) => {
  const isAdminPath = adminPaths.some(path => props.pathname.includes(path));

  if (!isAdminPath) {
    props.historyPush('/admin/members');
  }

  return (
    <AdminWrapperContainer>
      <Navbar pathname={props.pathname} />
      <AdminContent>{props.children}</AdminContent>
    </AdminWrapperContainer>
  );
};

interface Props {
  children: React.ReactElement;
  pathname: string;
  historyPush: (path: string) => void;
}

export default AdminWrapper;
