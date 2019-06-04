import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip } from 'antd';
import { IEvent, IEventAttendee } from '../store/withEvents';
import { StyledModal, BasicData, Description, Attendees, AcceptButton, DeclineButton } from './styles';
import withMe, { IWithMe } from '../store/withMe';
import attendEvent from '../store/attendEvent';
import neglectEvent from '../store/neglectEvent';

const getLocaleDate = (date: Date | string) =>
  new Date(date).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
  });

const renderAttendees = (attendees: IEventAttendee[]) => {
  return attendees.map(({ id, user: { fullName, image, profileURL } }) => (
    <Tooltip title={fullName} key={id}>
      <Link to={`/members/${profileURL}`}>
        <Avatar src={image} />
      </Link>
    </Tooltip>
  ));
};

const renderFooter = (myId: string, eventId: string, attendees: IEventAttendee[]) => {
  const meInAttendees: IEventAttendee = attendees.find(({ user: { id } }) => id === myId) || {};
  const myStatus = meInAttendees.id ? meInAttendees.status : '';
  const buttons = [];

  if (myStatus) {
    buttons.push(
      <DeclineButton
        key="decline"
        type={myStatus === 'NO' ? 'primary' : 'default'}
        onClick={() => neglectEvent(meInAttendees.id, eventId)}
      >
        Nie wezmę udziału
      </DeclineButton>,
    );
  }

  buttons.push(
    <AcceptButton
      key="accept"
      type={myStatus === 'YES' ? 'primary' : 'default'}
      onClick={() => attendEvent(meInAttendees.id, eventId)}
    >
      Wezmę udział
    </AcceptButton>,
  );

  return buttons;
};

const DetailsModal: React.FC<IProps> = ({ data, handleClose, me: { id: myId } }) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <StyledModal
      title={data.title}
      visible={visible}
      onCancel={closeModal}
      footer={renderFooter(myId, data.id, data.attendees)}
    >
      <BasicData>
        <div>
          <strong>Początek: </strong>
          <span>{getLocaleDate(data.start)}</span>
        </div>
        <div>
          <strong>Koniec: </strong>
          <span>{getLocaleDate(data.end)}</span>
        </div>
        <div>
          <strong>Miejsce: </strong>
          <span>{data.location}</span>
        </div>
      </BasicData>
      <Description>{data.description}</Description>
      <Attendees>
        <div>
          <strong>Wezmą udział:</strong>
          <div>{renderAttendees(data.attendees.filter(({ status }) => status === 'YES'))}</div>
        </div>
        <div>
          <strong>Nie wezmą udziału:</strong>
          <div>{renderAttendees(data.attendees.filter(({ status }) => status === 'NO'))}</div>
        </div>
        <div>
          <strong>Brak odpowiedzi:</strong>
          <div>{renderAttendees(data.attendees.filter(({ status }) => !status))}</div>
        </div>
      </Attendees>
    </StyledModal>
  );
};

interface IProps extends IWithMe {
  data: IEvent;
  handleClose: () => void;
}

export default withMe(DetailsModal);
