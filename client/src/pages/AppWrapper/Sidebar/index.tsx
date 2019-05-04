import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'components';

import { ReactComponent as NormalLogo } from 'static/logo.svg';
import { ReactComponent as SmallLogo } from 'static/signet.svg';
import { ReactComponent as Users } from 'static/fa/regular/users.svg';
import { ReactComponent as Books } from 'static/fa/regular/books.svg';
import { ReactComponent as Tasks } from 'static/fa/regular/tasks.svg';
import { ReactComponent as Stars } from 'static/fa/regular/stars.svg';
import { ReactComponent as CalendarAlt } from 'static/fa/regular/calendar-alt.svg';
import { ReactComponent as ChartBar } from 'static/fa/regular/chart-bar.svg';

import * as styles from './styles';

const { SidebarContainer, LogoWrapper, Menu, MenuItem } = styles;

const pathKeys = ['members', 'areas', 'projects', 'successes', 'events', 'stats'];

const AppWrapper = ({ collapsed, location, history }: Props) => {
  const currentItem = location.pathname.split('/')[1];

  if (!pathKeys.includes(currentItem)) {
    history.push('/members');
  }

  return (
    <SidebarContainer trigger={null} collapsible collapsed={collapsed}>
      <LogoWrapper>{collapsed ? <SmallLogo /> : <NormalLogo />}</LogoWrapper>
      <Menu mode="inline" selectedKeys={[currentItem]}>
        <MenuItem key="members">
          <Link to="/members">
            <Icon icon={Users} color="white" />
            <span>Członkowie</span>
          </Link>
        </MenuItem>
        <MenuItem key="areas">
          <Link to="/areas">
            <Icon icon={Books} color="white" />
            <span>Obszary</span>
          </Link>
        </MenuItem>
        <MenuItem key="projects">
          <Link to="/projects">
            <Icon icon={Tasks} color="white" />
            <span>Projekty</span>
          </Link>
        </MenuItem>
        <MenuItem key="successes">
          <Link to="/successes">
            <Icon icon={Stars} color="white" />
            <span>Sukcesy</span>
          </Link>
        </MenuItem>
        <MenuItem key="events">
          <Link to="/events">
            <Icon icon={CalendarAlt} color="white" />
            <span>Wydarzenia</span>
          </Link>
        </MenuItem>
        <MenuItem key="stats">
          <Link to="/stats">
            <Icon icon={ChartBar} color="white" />
            <span>Statystyki</span>
          </Link>
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

interface Props extends RouteComponentProps {
  collapsed: boolean;
}

export default withRouter(AppWrapper);
