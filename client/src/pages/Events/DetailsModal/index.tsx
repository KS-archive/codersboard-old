import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip } from 'antd';
import { IEvent, IEventAttendee } from '../store/withEvents';
import { getLocaleDate } from '../helpers';
import Footer from './Footer';
import { StyledModal, BasicData, Description, Attendees } from './styles';

const renderAttendees = (attendees: IEventAttendee[]) => {
  return attendees.map(({ id, user: { fullName, image, profileURL } }) => (
    <Tooltip title={fullName} key={id}>
      <Link to={`/members/${profileURL}`}>
        <Avatar src={image} />
      </Link>
    </Tooltip>
  ));
};

const groupAttendeesByStatus = (attendees: IEventAttendee[]) => {
  const result = {
    yes: [] as IEventAttendee[],
    no: [] as IEventAttendee[],
    waiting: [] as IEventAttendee[],
  };

  for (const attendee of attendees) {
    if (attendee.status === 'YES') result.yes.push(attendee);
    else if (attendee.status === 'NO') result.no.push(attendee);
    else result.waiting.push(attendee);
  }

  return result;
}

const DetailsModal: React.FC<IProps> = ({ data, handleClose, ...props }) => {
  const [visible, setVisible] = useState(true);
  const attendees = groupAttendeesByStatus(data.attendees);

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
      footer={<Footer event={data} closeModal={closeModal} openEditModal={openEditModal} />}
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
            {!!attendees.yes.length && (
              <div>
                <strong>Wezmą udział:</strong>
                <div>{renderAttendees(attendees.yes)}</div>
              </div>
            )}
            {!!attendees.no.length && (
              <div>
                <strong>Nie wezmą udziału:</strong>
                <div>{renderAttendees(attendees.no)}</div>
              </div>
            )}
            {!!attendees.waiting.length && (
              <div>
                <strong>Brak odpowiedzi:</strong>
                <div>{renderAttendees(attendees.waiting)}</div>
              </div>
            )}
          </Attendees>
        </>
      )}
    </StyledModal>
  );
};

interface IProps {
  data?: IEvent;
  handleClose: () => void;
  openEditModal: (modalData: IEvent) => void;
}

export default DetailsModal;
