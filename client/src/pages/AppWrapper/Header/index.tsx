import React from 'react';
import { Avatar, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as Indent } from 'static/fa/regular/indent.svg';
import { ReactComponent as Outdent } from 'static/fa/regular/outdent.svg';
import { withMe, MeProps } from 'store/user/queries/Me';
import { signOut } from 'store/user/mutations/SignOut';
import { Icon } from 'components';
import { MainPermission } from 'types/User';
import * as styles from './styles';

const { HeaderContainer, Right, Name, Menu, MenuItem } = styles;

const menu = (
  <Menu>
    <MenuItem onClick={signOut}>Sign out</MenuItem>
  </Menu>
);

const adminPermissions = ['OWNER', 'ADMIN', 'HR', 'FINANCE'];
const hasAdminPermission = (permission: MainPermission) => adminPermissions.includes(permission);

const Header = ({ isSidebarCollapsed, toggleCollapsed, me }: Props) => {
  const isAdmin = me && me.permissions.some(hasAdminPermission);

  return (
    <HeaderContainer>
      <Icon icon={isSidebarCollapsed ? Indent : Outdent} size={24} onClick={toggleCollapsed} />
      <Right>
        {isAdmin && (
          <Button>
            <Link to="/admin" />Admin panel
          </Button>
        )}
        <Dropdown overlay={menu} trigger={['click']}>
          <div>
            <Avatar size={32} src={me && me.image} />
            <Name>{me && me.fullName}</Name>
          </div>
        </Dropdown>
      </Right>
    </HeaderContainer>
  );
};

interface Props {
  isSidebarCollapsed: boolean;
  toggleCollapsed: () => void;
  me: MeProps;
}

export default withMe(Header);
