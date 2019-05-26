import React from 'react';
import { Avatar, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as Indent } from 'static/fa/regular/indent.svg';
import { ReactComponent as Outdent } from 'static/fa/regular/outdent.svg';
import { Icon } from 'components';
import { MainPermission } from 'types/User';
import signOut from './store/signOut';
import withMe, { IWithMe } from './store/withMe';
import * as styles from './styles';

const { HeaderContainer, Right, Name, Menu, MenuItem } = styles;

const adminPermissions = ['OWNER', 'ADMIN', 'HR', 'FINANCE'];
const hasAdminPermission = (permission: MainPermission) => adminPermissions.includes(permission);

const Header: React.FC<IProps> = ({ isSidebarCollapsed, toggleCollapsed, me }) => {
  const isAdmin = me && me.permissions.some(hasAdminPermission);

  return (
    <HeaderContainer>
      <Icon icon={isSidebarCollapsed ? Indent : Outdent} size={24} onClick={toggleCollapsed} />
      <Right>
        {isAdmin && (
          <Button>
            <Link to="/admin" />
            Admin panel
          </Button>
        )}
        <Dropdown
          overlay={
            <Menu>
              <MenuItem>
                <Link to={`/settings/${me && me.profileURL}`}>Ustawienia</Link>
              </MenuItem>
              <MenuItem onClick={signOut}>Wyloguj się</MenuItem>
            </Menu>
          }
          trigger={['click']}
        >
          <div>
            <Avatar size={32} src={me && me.image} />
            <Name>{me && me.fullName}</Name>
          </div>
        </Dropdown>
      </Right>
    </HeaderContainer>
  );
};

interface IProps extends IWithMe {
  isSidebarCollapsed: boolean;
  toggleCollapsed: () => void;
}

export default withMe(Header);
