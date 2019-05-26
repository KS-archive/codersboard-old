import React, { useState, useEffect } from 'react';
import { Typography, Spin } from 'antd';

import { hasPermissions } from 'utils';

import withSuccesses, { IWithSuccesses } from './store/withSuccesses';
import Success from './Success';
import SuccessModal from './SuccessModal';
import { SuccessesContainer, Header, AddButton, Timeline } from './styles';

const { Title } = Typography;

const Successes: React.FC<IProps> = ({ successes = [], successesLoading }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = () => setModalData(null);

  useEffect(() => {
    (async () => {
      const isAdmin = await hasPermissions(['OWNER', 'ADMIN']);
      setIsAdmin(isAdmin);
    })()
  }, []);

  return (
    <SuccessesContainer>
      <Header>
        <Title level={2}>Sukcesy</Title>
        {isAdmin && <AddButton type="primary" onClick={() => setModalData({})}>Dodaj sukces</AddButton>}
      </Header>
      <Spin tip="Wczytywanie sukcesów" spinning={successesLoading}>
        <Timeline>
          {successes.map(success => <Success key={success.id} {...success} />)}
        </Timeline>
      </Spin>
      {modalData && <SuccessModal formValues={modalData} onClose={closeModal} />}
    </SuccessesContainer>
  );
}

interface IProps extends IWithSuccesses {}

export default withSuccesses(Successes);
