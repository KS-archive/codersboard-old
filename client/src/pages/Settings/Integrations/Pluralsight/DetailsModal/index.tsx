import React, { useState } from 'react';
import { Button } from 'antd';

import { PluralsightSkill } from '..';
import { Modal, Skill, Title } from './styles';

const CodewarsDetails: React.FC<IProps> = ({ handleClose, skills }) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <Modal
      title="Umiejętności pobrane z Twojego konta Pluralsight"
      visible={visible}
      onCancel={closeModal}
      width={800}
      footer={[
        <Button key="close" onClick={closeModal} type="primary">
          Zamknij
        </Button>,
      ]}
    >
      {skills.map(skill => {
        return (
          <Skill
            key={skill.id}
            size="small"
            title={
              <Title>
                <img src={skill.thumbnailUrl} alt={skill.title} />
                <h3>{skill.title}</h3>
              </Title>
            }
          >
            <div>
              <strong>Wynik:</strong>
              <p>{skill.score}</p>
            </div>
            <div>
              <strong>Lepszy niż:</strong>
              <p>{Math.round(skill.percentile)}%</p>
            </div>
            <div>
              <strong>Poziom:</strong>
              <p>{skill.level}</p>
            </div>
            <div>
              <strong>Data testu:</strong>
              <p>
                {new Date(skill.dateCompleted).toLocaleString('pl-PL', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Skill>
        );
      })}
    </Modal>
  );
};

interface IProps {
  handleClose: () => void;
  skills: PluralsightSkill[];
}

export default CodewarsDetails;
