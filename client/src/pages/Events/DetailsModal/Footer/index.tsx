import React from 'react';
import { Button } from 'antd';
import { ReactComponent as TrashAlt } from 'static/fa/regular/trash-alt.svg';
import { ReactComponent as Edit } from 'static/fa/regular/edit.svg';
import { Icon } from 'components';
import { IEvent } from '../../store/withEvents';
import attendEvent from '../../store/attendEvent';
import neglectEvent from '../../store/neglectEvent';
import useEditAccess from '../../hooks/useEditAccess';
import useMyAttendeeData from '../../hooks/useMyAttendeeData';
import { handleEventDelete } from '../../helpers';

import { AcceptButton, DeclineButton } from './styles';

const EventDetailsFooter: React.FC<IProps> = ({ event, closeModal, openEditModal }) => {
  const hasEditAccess = useEditAccess(event);
  const { status, id } = useMyAttendeeData(event);
  const buttons = [];

  if (hasEditAccess) {
    buttons.push(
      <Button key="delete" type="danger" ghost onClick={() => handleEventDelete(event.id, closeModal)}>
        <Icon icon={TrashAlt} color="color-danger" />
      </Button>,
    );

    buttons.push(
      <Button key="edit" type="primary" ghost onClick={openEditModal}>
        <Icon icon={Edit} color="color-primary" />
      </Button>,
    );
  }

  if (status) {
    buttons.push(
      <DeclineButton
        key="decline"
        type={status === 'NO' ? 'primary' : 'default'}
        onClick={() => neglectEvent(event.id, id)}
      >
        Nie wezmę udziału
      </DeclineButton>,
    );
  }

  buttons.push(
    <AcceptButton
      key="accept"
      type={status === 'YES' ? 'primary' : 'default'}
      onClick={() => attendEvent(event.id, id)}
    >
      Wezmę udział
    </AcceptButton>,
  );

  return <>{buttons}</>;
};

interface IProps {
  event: IEvent;
  closeModal: () => void;
  openEditModal: () => void;
}

export default EventDetailsFooter;
