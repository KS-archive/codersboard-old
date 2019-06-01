import React, { useState } from 'react';
import { Button, Modal, message, Spin } from 'antd';

import IntegrateModal from './IntegrateModal';
import DetailsModal from './DetailsModal';
import detachCodewars from '../store/detachCodewars';
import { PluralsightContainer, Content, Image, Text, Title, Description, Buttons } from './styles';

const detach = () => {
  Modal.confirm({
    title: `Czy jesteś pewien, że chcesz odłączyć integrację z Codewars?`,
    content: 'Tej operacji nie będziesz mógł cofnąć.',
    okText: 'Tak, odłącz',
    okType: 'danger',
    icon: null,
    cancelText: 'Nie, pozostaw',
    onOk: async () => {
      await detachCodewars();
      message.success('Konto na Codewars zostało odłączone od Twojego profilu');
    },
  });
};

const Codewars: React.FC<IProps> = ({ data, loading }) => {
  const [modal, setModal] = useState('');
  const closeModal = () => setModal('');

  return (
    <Spin spinning={loading} tip="Wczytywanie danych z Pluralsight">
      <PluralsightContainer>
        <Content>
          <Image src="/pluralsight_logo.png" />
          <Text>
            <Title integrated={!!data}>Pluralsight</Title>
            <Description>Kursy progranistyczne oraz Skill IQ.</Description>
          </Text>
        </Content>
        <Buttons>
          {!data && <Button onClick={() => setModal('integrate')}>Zintegruj</Button>}
          {data && (
            <Button type="danger" onClick={detach}>
              Odłącz
            </Button>
          )}
          {data && (
            <Button type="primary" onClick={() => setModal('details')}>
              Pobrane dane
            </Button>
          )}
        </Buttons>

        {modal === 'integrate' && <IntegrateModal handleClose={closeModal} />}
        {modal === 'details' && <DetailsModal handleClose={closeModal} skills={data} />}
      </PluralsightContainer>
    </Spin>
  );
};

export interface PluralsightSkill {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  score: number;
  percentile: number;
  level: string;
  dateCompleted: string;
}

interface IProps {
  data?: PluralsightSkill[];
  loading: boolean;
}

export default Codewars;
