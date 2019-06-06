import React, { useState } from 'react';
import { List, Typography, Modal, message } from 'antd';

import useHasMainPermission from 'hooks/useHasMainPermission';

import withMembers, { IWithMembers, IMember } from './store/withMembers';
import deleteMember from './store/deleteMember';
import Member from './Member';
import MemberModal from './MemberModal';
import { MembersContainer, Header, AddButton } from './styles';
import useHasProjectPermission from 'hooks/useHasProjectPermission';

const { Title } = Typography;

const handleMemberDelete = (member: IMember) => {
  Modal.confirm({
    title: `Czy jesteś pewien, że chcesz usunąć członka ${member.user.fullName} z projektu?`,
    content: 'Tej operacji nie będziesz mógł cofnąć.',
    okText: 'Tak, usuń',
    okType: 'danger',
    icon: null,
    cancelText: 'Nie, pozostaw',
    onOk: async () => {
      await deleteMember(member.id);
      message.success('Członek został usunięty z projektu');
    },
  });
};

const Members: React.FC<IProps> = ({ members, membersLoading }) => {
  const [modalData, setModalData] = useState(null);
  const isAdmin = useHasMainPermission(['OWNER', 'ADMIN']);
  const isProjectAdmin = useHasProjectPermission(['OWNER', 'ADMIN']);

  const closeModal = () => setModalData(null);

  return (
    <MembersContainer>
      <Header>
        <Title level={2}>Członkowie projektu</Title>
        {(isAdmin || isProjectAdmin) && (
          <AddButton type="primary" onClick={() => setModalData({})}>
            Dodaj członka
          </AddButton>
        )}
      </Header>
      <List
        rowKey="id"
        itemLayout="vertical"
        loading={membersLoading}
        dataSource={members}
        renderItem={member => (
          <Member {...member} onEdit={() => setModalData(member)} onDelete={() => handleMemberDelete(member)} />
        )}
      />
      {modalData && <MemberModal modalData={modalData} onClose={closeModal} />}
    </MembersContainer>
  );
};

interface IProps extends IWithMembers {}

export default withMembers(Members);
