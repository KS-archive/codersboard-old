import React, { Component } from 'react';
import Calendar, { Event, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import withEvents, { IWithEvents, IEvent } from './store/withEvents';
import DetailsModal from './DetailsModal';
import { BigCalendar } from './styles';

moment.locale('pl');

const localizer = Calendar.momentLocalizer(moment);

const messages = {
  time: 'Czas',
  date: 'Data',
  event: 'Wydarzenie',
  allDay: 'Cały dzień',
  week: 'Tydzień',
  work_week: 'Dni robocze',
  day: 'Dzień',
  month: 'Miesiąc',
  previous: 'Poprzedni',
  next: 'Następny',
  yesterday: 'Wczoraj',
  tomorrow: 'Jutro',
  today: 'Obecny',
  showMore: (count: number) => `Pokaż więcej (${count})`,
  noEventsInRange: 'Brak wydarzeń',
};

const changeEventDates = (resizeParams: IResizeParams) => (state: IState) => {
  const index = state.events.findIndex(
    ({ title, start }) => title === resizeParams.event.title && start === resizeParams.event.start,
  );
  state.events[index].start = resizeParams.start as Date;
  state.events[index].end = resizeParams.end as Date;
  return { events: state.events };
};

class Events extends Component<IProps, IState> {
  state: IState = {
    events: [],
    openedModal: '',
    modalData: null,
  };

  componentDidUpdate(prevProps: IProps, prevState: any) {
    if (prevProps.eventsLoading && !this.props.eventsLoading) {
      const events = this.props.events.map(event => ({
        start: event.start && new Date(event.start),
        end: event.end && new Date(event.end),
        title: event.title,
        resource: event,
      }));

      this.setState({ events });
    }
  }

  handleSelect = ({ start, end, action }: ISlotInfo) => {
    this.setState({
      events: [
        ...this.state.events,
        {
          start: start as Date,
          end: end as Date,
          title: 'Nowe wydarzenie',
        },
      ],
    });
  };

  onEventResize = (resizeParams: IResizeParams) => {
    this.setState(changeEventDates(resizeParams));
  };

  onEventDrop = (resizeParams: IResizeParams) => {
    this.setState(changeEventDates(resizeParams));
  };

  openDetailsModal = (event: Event) => this.setState({ openedModal: 'details', modalData: event.resource });

  closeModal = () => this.setState({ openedModal: '', modalData: null });

  render() {
    const { events, openedModal, modalData } = this.state;

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
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onSelectEvent={this.openDetailsModal}
          onSelectSlot={this.handleSelect}
        />
        {openedModal === 'details' && <DetailsModal data={modalData} handleClose={this.closeModal} />}
      </>
    );
  }
}

interface IResizeParams {
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
  events: Event[];
  openedModal: string;
  modalData: IEvent;
}

export default withEvents(Events);
