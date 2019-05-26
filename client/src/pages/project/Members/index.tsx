import React from 'react';
import { List, Typography } from 'antd';
import withMembers, { IWithMembers } from './store/withMembers';
import Member from './Member';
import { MembersContainer, Header, AddButton } from './styles';

const { Title } = Typography;

const Members: React.FC<IProps> = ({ members, membersLoading }) => {
  return (
    <MembersContainer>
      <Header>
        <Title level={2}>Członkowie projektu</Title>
        <AddButton type="primary">Dodaj członka</AddButton>
      </Header>
      <List
        rowKey="id"
        grid={{ gutter: 0, sm: 1, lg: 2, xxl: 3 }}
        loading={membersLoading}
        dataSource={members}
        renderItem={member => <Member {...member} />}
      />
    </MembersContainer>
  );
};

interface IProps extends IWithMembers {}

export default withMembers(Members);
