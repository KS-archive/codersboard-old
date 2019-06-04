import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip, Button, Modal, message } from 'antd';
import { ReactComponent as TrashAlt } from 'static/fa/regular/trash-alt.svg';
import { ReactComponent as Edit } from 'static/fa/regular/edit.svg';
import { Icon } from 'components';
import { IEvent, IEventAttendee } from '../store/withEvents';
import withMe, { IWithMe } from '../store/withMe';
import attendEvent from '../store/attendEvent';
import neglectEvent from '../store/neglectEvent';
import deleteEvent from '../store/deleteEvent';
import { StyledModal, BasicData, Description, Attendees, AcceptButton, DeclineButton } from './styles';

const handleEventDelete = (eventId: string, closeModal: () => void) => {
  Modal.confirm({
    title: 'Czy jesteś pewien, że chcesz usunąć ten wydarzenie?',
    content: 'Tej operacji nie będziesz mógł cofnąć.',
    okText: 'Tak, usuń wydarzenie',
    okType: 'danger',
    icon: null,
    width: 480,
    cancelText: 'Nie, pozostaw wydarzenie',
    onOk: async () => {
      await deleteEvent(eventId);
      closeModal();
      message.success('Wydarzenie zostało usunięte');
    },
  });
};

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

const renderFooter = (
  myId: string,
  eventId: string,
  attendees: IEventAttendee[],
  closeModal: () => void,
  openEditModal: () => void,
) => {
  const meInAttendees: IEventAttendee = attendees.find(({ user: { id } }) => id === myId) || {};
  const myStatus = meInAttendees.id ? meInAttendees.status : '';
  const buttons = [];

  buttons.push(
    <Button key="delete" type="danger" ghost onClick={() => handleEventDelete(eventId, closeModal)}>
      <Icon icon={TrashAlt} color="color-danger" />
    </Button>,
  );

  buttons.push(
    <Button key="edit" type="primary" ghost onClick={openEditModal}>
      <Icon icon={Edit} color="color-primary" />
    </Button>,
  );

  if (myStatus) {
    buttons.push(
      <DeclineButton
        key="decline"
        type={myStatus === 'NO' ? 'primary' : 'default'}
        onClick={() => neglectEvent(eventId, meInAttendees.id)}
      >
        Nie wezmę udziału
      </DeclineButton>,
    );
  }

  buttons.push(
    <AcceptButton
      key="accept"
      type={myStatus === 'YES' ? 'primary' : 'default'}
      onClick={() => attendEvent(eventId, meInAttendees.id)}
    >
      Wezmę udział
    </AcceptButton>,
  );

  return buttons;
};

const DetailsModal: React.FC<IProps> = ({ data, handleClose, me: { id: myId }, ...props }) => {
  const [visible, setVisible] = useState(true);

  const openEditModal = () => props.openEditModal(data);

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
      footer={data.id ? renderFooter(myId, data.id, data.attendees, closeModal, openEditModal) : null}
    >
      {data.id && (
        <>
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
        </>
      )}
    </StyledModal>
  );
};

interface IProps extends IWithMe {
  data?: IEvent;
  handleClose: () => void;
  openEditModal: (modalData: IEvent) => void;
}

export default withMe(DetailsModal);
