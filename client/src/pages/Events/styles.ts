import styled from 'styled-components';
import ReactBigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import get from 'styles/getStyle';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DnDCalendar = withDragAndDrop(ReactBigCalendar);

export const BigCalendar = styled(DnDCalendar)`
  &.rbc-calendar {
    height: calc(100vh - 128px);

    .rbc-time-view,
    .rbc-month-view,
    .rbc-agenda-table,
    .rbc-agenda-content {
      background-color: ${get('color-grayscale-white')};
    }

    .rbc-time-view,
    .rbc-month-view {
      border-radius: ${get('radius-4')};
    }

    .rbc-agenda-table {
      border-radius: ${get('radius-4')} ${get('radius-4')} 0 0;
    }

    .rbc-agenda-content {
      border-radius: 0 0 ${get('radius-4')} ${get('radius-4')};
    }

    .rbc-event {
      background-color: ${get('color-primary')};
    }

    .rbc-off-range-bg {
      background-color: ${get('color-grayscale-light')};
    }

    .rbc-day-bg + .rbc-day-bg {
      border-left: none;
    }

    .rbc-timeslot-group {
      border-bottom: none;
    }

    .rbc-today {
      background-color: rgba(24,144,255, 0.06);
    }

    .rbc-current-time-indicator {
      background-color: ${get('color-secondary')};
      height: 2px;
    }

    .rbc-time-header.rbc-overflowing {
      border-right: none;
    }
  }
`;
