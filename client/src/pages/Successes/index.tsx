import React, { useState, useEffect } from 'react';
import { Typography, Spin, Modal, message } from 'antd';

import { hasPermissions } from 'utils';

import withSuccesses, { IWithSuccesses, ISuccess } from './store/withSuccesses';
import deleteSuccess from './store/deleteSuccess';
import Success from './Success';
import SuccessModal from './SuccessModal';
import { SuccessesContainer, Header, AddButton, Timeline } from './styles';

const { Title } = Typography;

const handleSuccessDelete = (success: ISuccess) => {
  Modal.confirm({
    title: 'Czy jesteś pewien, że chcesz usunąć ten sukces?',
    content: 'Tej operacji nie będziesz mógł cofnąć.',
    okText: 'Tak, usuń sukces',
    okType: 'danger',
    icon: null,
    cancelText: 'Nie, pozostaw sukces',
    onOk: async () => {
      await deleteSuccess(success.id);
      message.success('Sukces został usunięty');
    },
  });
};

const Successes: React.FC<IProps> = ({ successes = [], successesLoading }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = () => setModalData(null);

  useEffect(() => {
    (async () => {
      const isAdmin = await hasPermissions(['OWNER', 'ADMIN']);
      setIsAdmin(isAdmin);
    })();
  }, []);

  return (
    <SuccessesContainer>
      <Header>
        <Title level={2}>Sukcesy</Title>
        {isAdmin && (
          <AddButton type="primary" onClick={() => setModalData({})}>
            Dodaj sukces
          </AddButton>
        )}
      </Header>
      <Spin tip="Wczytywanie sukcesów" spinning={successesLoading}>
        <Timeline>
          {successes.map(success => (
            <Success
              key={success.id}
              {...success}
              onEdit={() => setModalData(success)}
              onDelete={() => handleSuccessDelete(success)}
            />
          ))}
        </Timeline>
      </Spin>
      {modalData && <SuccessModal modalData={modalData} onClose={closeModal} />}
    </SuccessesContainer>
  );
};

interface IProps extends IWithSuccesses {}

export default withSuccesses(Successes);
