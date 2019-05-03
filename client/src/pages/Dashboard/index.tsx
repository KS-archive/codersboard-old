import React from 'react';
import logo from './logo.svg';
import * as styles from './styles';

const { DashboardContainer, Header, Logo, Link } = styles;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header>
        <Logo src={logo} alt="logo" />
        <p>
          Edit <code>src/Dashboard.tsx</code> and save to reload.
        </p>
        <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Link>
      </Header>
    </DashboardContainer>
  );
};

export default Dashboard;
