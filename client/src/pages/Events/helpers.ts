import { message, Modal } from 'antd';
import 'moment/locale/pl';
import { omit } from 'utils';
import { IEvent } from './store/withEvents';
import updateEvent from './store/updateEvent';
import { IResizeParams } from '.';
import deleteEvent from './store/deleteEvent';

export const getLocaleDate = (date: Date | string) =>
  new Date(date).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
  });

export const messages = {
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

export const parseEventToEventValues = (event: IEvent) => {
  return ({
    ...omit(event, ['__typename', 'project', 'area']),
    projectId: event.project ? event.project.id : '',
    areaId: event.area ? event.area.id : '',
    attendees: event.attendees.map(({ user: { id } }) => id),
    start: new Date(event.start),
    end: event.end && new Date(event.end),
  });
}

export const onDatesRangeChange = (resizeParams: IResizeParams) => {
  const event = parseEventToEventValues(resizeParams.event.resource);
  const { start, end } = resizeParams;

  Modal.confirm({
    title: 'Zmiana przedziału czasowego',
    content: `Czy chcesz zmienić przedział czasowy wydarzenia z
    ${getLocaleDate(event.start)} - ${getLocaleDate(event.end)}
    na
    ${getLocaleDate(start)} - ${getLocaleDate(end)}`,
    okText: 'Tak, zmień',
    okType: 'primary',
    icon: null,
    cancelText: 'Nie, pozostaw',
    onOk: async () => {
      try {
        await updateEvent({ ...event, start: new Date(start), end: new Date(end) });
        message.success('Przedział czasowy wydarzenia został zmieniony');
      } catch (ex) {
        message.error('Podczas zmiany przedziału czasowego wystąpił błąd');
      }
    },
  });
};

export const handleEventDelete = (eventId: string, closeModal: () => void) => {
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
