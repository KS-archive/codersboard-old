import React from 'react';
import { Navbar } from 'components';
import { withRouter, RouteComponentProps } from 'react-router';
import { AdminWrapperContainer, AdminContent, Text } from './styles';

// const adminPaths = ['members', 'universities', 'skills'];

const navItems = [
  {
    key: 'universities',
    label: 'Uczelnie',
  },
  {
    key: 'skills',
    label: 'Umiejętności',
  },
];

const AdminWrapper: React.FC<IProps> = ({ children, history, location }) => {
  const pathnameArr = location.pathname.split('/');

  if (pathnameArr.length === 2) {
    history.replace(location.pathname + '/skills');
    return null;
  }

  const path = location.pathname.split('/')[2];
  const pathBase = pathnameArr.slice(0, pathnameArr.length - 1).join('/');

  return (
    <AdminWrapperContainer>
      <Navbar path={path} pathBase={pathBase} navItems={navItems}>
        <Text>Panel administracyjny</Text>
      </Navbar>
      <AdminContent>{children}</AdminContent>
    </AdminWrapperContainer>
  );
};

interface IProps extends RouteComponentProps {
  children: React.ReactElement;
}

export default withRouter(AdminWrapper);
