import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles';

const { NavbarContainer, NavItem } = styles;

const Navbar = (props: Props) => {
  return (
    <NavbarContainer mode="horizontal" selectedKeys={[props.pathname]}>
      <NavItem key="/admin/members">
        <Link to="/admin/members">Członkowie</Link>
      </NavItem>
      <NavItem key="/admin/universities">
        <Link to="/admin/universities">Uczelnie</Link>
      </NavItem>
      <NavItem key="/admin/skills">
        <Link to="/admin/skills">Umiejętności</Link>
      </NavItem>
    </NavbarContainer>
  );
};

interface Props {
  pathname: string;
}

export default Navbar;
