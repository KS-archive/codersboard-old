import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';

import IntegrateModal from './IntegrateModal';
import DetailsModal from './DetailsModal';
import { CodewarsContainer, Content, Image, Text, Title, Description, Buttons } from './styles';
import detachCodewars from '../store/detachCodewars';

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
}

const Codewars: React.FC<IProps> = ({ data }) => {
  const [modal, setModal] = useState('');
  const closeModal = () => setModal('');

  return (
    <CodewarsContainer>
      <Content>
        <Image src="/codewars_logo.png" />
        <Text>
          <Title>Codewars</Title>
          <Description>Portal z wyzwaniami dla programistów.</Description>
        </Text>
      </Content>
      <Buttons>
        {!data && (
          <Button onClick={() => setModal('integrate')}>
            Zintegruj
          </Button>
        )}
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
      {modal === 'details' && <DetailsModal handleClose={closeModal} {...data} />}
    </CodewarsContainer>
  );
};

export interface CodewarsData {
  name: string;
  honor: number;
  kyu: number;
  completedChallenges: number;
  leaderboardPosition: number;
  score: number;
  languages: {
    kyu: number;
    name: string;
    score: number;
  }[];
}

interface IProps {
  data?: CodewarsData;
}

export default Codewars;
