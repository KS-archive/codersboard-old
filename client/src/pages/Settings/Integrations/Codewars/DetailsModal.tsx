import React, {useState} from 'react';
import { Modal } from 'antd';
import { CodewarsData } from '.';

const CodewarsDetails: React.FC<IProps> = ({
  handleClose,
  name,
  kyu,
  honor,
  score,
  completedChallenges,
  leaderboardPosition,
}) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 500);
  }

  return (
    <Modal title="Dane pobrane z Twojego konta Codewars" visible={visible} onOk={closeModal} onCancel={closeModal}>
      <div>
        <p>{`Nazwa użytkownika: ${name}`}</p>
        <p>{`Kyu: ${kyu}`}</p>
        <p>{`Honor: ${honor}`}</p>
        <p>{`Zebrane punkty: ${score}`}</p>
        <p>{`Ukończone wyzwania: ${completedChallenges}`}</p>
        <p>{`Pozycja w rankingu: ${leaderboardPosition}`}</p>
      </div>
    </Modal>
  );
};

interface IProps extends CodewarsData {
  handleClose: () => void;
}

export default CodewarsDetails;
