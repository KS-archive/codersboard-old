import React, { Component } from 'react';
import Calendar, { Event, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import withEvents, { IWithEvents, IEvent } from './store/withEvents';
import DetailsModal from './DetailsModal';
import FormModal from './FormModal';
import { messages, parseEventToEventValues, onDatesRangeChange } from './helpers';
import { BigCalendar } from './styles';

moment.locale('pl');

const localizer = Calendar.momentLocalizer(moment);

class Events extends Component<IProps, IState> {
  state: IState = {
    openedModal: '',
    modalDataIndex: -1,
    modalData: {},
  };

  handleSelect = ({ start, end, action }: ISlotInfo) =>
    this.setState({ openedModal: 'form', modalData: { start: new Date(start), end: new Date(end) } });

  openEditModal = (modalData: IEvent) =>
    this.setState({
      openedModal: 'form',
      modalData: parseEventToEventValues(modalData),
    });

  openDetailsModal = (event: Event) => {
    this.setState({
      openedModal: 'details',
      modalDataIndex: this.props.events.findIndex(({ resource: { id } }) => id === event.resource.id),
    });
  };

  closeModal = () => this.setState({ openedModal: '', modalDataIndex: -1 });

  render() {
    const { openedModal, modalDataIndex, modalData } = this.state;
    const { events } = this.props;

    return (
      <>
        <BigCalendar
          resizable
          selectable
          culture="pl"
          localizer={localizer}
          messages={messages}
          events={events}
          views={['week', 'month', 'agenda']}
          defaultView={Calendar.Views.WEEK}
          min={new Date(2019, 10, 0, 8, 0, 0)}
          max={new Date(2019, 10, 0, 23, 59, 59)}
          onEventDrop={onDatesRangeChange}
          onEventResize={onDatesRangeChange}
          onSelectEvent={this.openDetailsModal}
          onSelectSlot={this.handleSelect}
        />
        {openedModal === 'details' && (
          <DetailsModal
            openEditModal={this.openEditModal}
            data={events[modalDataIndex] && events[modalDataIndex].resource}
            handleClose={this.closeModal}
          />
        )}
        {openedModal === 'form' && <FormModal data={modalData} handleClose={this.closeModal} />}
      </>
    );
  }
}

export interface IResizeParams {
  event: Event;
  start: stringOrDate;
  end: stringOrDate;
  allDay: boolean;
}

interface ISlotInfo {
  start: stringOrDate;
  end: stringOrDate;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
}

interface IProps extends IWithEvents {}

interface IState {
  openedModal: string;
  modalDataIndex: number;
  modalData: IEvent;
}

export default withEvents(Events);
