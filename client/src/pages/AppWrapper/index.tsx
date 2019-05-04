import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import * as styles from './styles';

const { Container, RightColumn, Content, ContentCard } = styles;

const AppWrapper = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Container>
      <Sidebar collapsed={collapsed} />
      <RightColumn>
        <Header isSidebarCollapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content>
          <Breadcrumbs />
          <ContentCard>
            {props.children}
          </ContentCard>
        </Content>
      </RightColumn>
    </Container>
  );
};

interface Props {
  children: React.ReactElement;
}

export default AppWrapper;
