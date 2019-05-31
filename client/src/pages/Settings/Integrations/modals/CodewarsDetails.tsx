import React from 'react';
import { Modal } from 'antd';
import { CodewarsData } from '../store/withIntegrations';

const CodewarsDetails: React.FC<IProps> = ({ codewars, visible, handleClose }) => {
  return (
    <Modal title="Dane pobrane z Twojego konta Codewars" visible={visible} onOk={handleClose} onCancel={handleClose}>
      <div>
        <p>{`Nazwa użytkownika: ${codewars.name}`}</p>
        <p>{`Kyu: ${codewars.kyu}`}</p>
        <p>{`Honor: ${codewars.honor}`}</p>
        <p>{`Zebrane punkty: ${codewars.score}`}</p>
        <p>{`Ukończone wyzwania: ${codewars.completedChallenges}`}</p>
        <p>{`Pozycja w rankingu: ${codewars.leaderboardPosition}`}</p>
      </div>
    </Modal>
  );
};

interface IProps {
  codewars: CodewarsData;
  visible: boolean;
  handleClose: () => void;
}

export default CodewarsDetails;
