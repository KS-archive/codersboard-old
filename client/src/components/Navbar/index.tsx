import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarContainer, BeforeItems, NavbarItems, NavItem } from './styles';

const Navbar: React.FC<IProps> = ({ path, pathBase, children, navItems }) => (
  <NavbarContainer>
    <BeforeItems>{children}</BeforeItems>
    <NavbarItems mode="horizontal" selectedKeys={[path]}>
      {navItems.map(({ key, label }) => (
        <NavItem key={key}>
          <Link to={`${pathBase}/${key}`}>{label}</Link>
        </NavItem>
      ))}
    </NavbarItems>
  </NavbarContainer>
);

interface INavItem {
  key: string;
  label: string;
}

interface IProps {
  children: React.ReactNode;
  path: string;
  pathBase: string;
  navItems: INavItem[];
}

export default Navbar;
