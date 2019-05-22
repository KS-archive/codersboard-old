import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import * as styles from './styles';

const { Container, RightColumn, Content } = styles;

const AppWrapper = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Container>
      <Sidebar collapsed={collapsed} />
      <RightColumn>
        <Header isSidebarCollapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content>{props.children}</Content>
      </RightColumn>
    </Container>
  );
};

interface Props {
  children: React.ReactElement;
}

export default AppWrapper;
