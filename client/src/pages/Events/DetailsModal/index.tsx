import React, { useState } from 'react';
import { Modal } from 'antd';
import { IEvent } from '../store/withEvents';

const DetailsModal: React.FC<IProps> = ({ data, handleClose }) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  console.log(data);

  return (
    <Modal title="Szczegóły wydarzenia" visible={visible} onCancel={closeModal} footer={null}>
      <div>
        <strong>Nazwa: </strong>
        <span>{data.title}</span>
      </div>
      <div>
        <strong>Opis: </strong>
        <span>{data.description}</span>
      </div>
      <div>
        <strong>Data rozpoczęcia: </strong>
        <span>
          {new Date(data.start).toLocaleString('pl-PL', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <div>
        <strong>Data zakończenia: </strong>
        <span>
          {new Date(data.end).toLocaleString('pl-PL', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <div>
        <strong>Miejsce: </strong>
        <span>{data.location}</span>
      </div>
      <div>
        <strong>URL grafiki: </strong>
        <span>{data.image}</span>
      </div>
      <div>
        <strong>Zaproszone osoby: </strong>
        <span>
          {data.attendees.map(attendee => (
            <span key={attendee.id}>{`${attendee.user.fullName} (${attendee.status || 'WAITING'}), `}</span>
          ))}
        </span>
      </div>
    </Modal>
  );
};

interface IProps {
  data: IEvent;
  handleClose: () => void;
}

export default DetailsModal;
