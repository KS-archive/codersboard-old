import styled from 'styled-components';
import ReactBigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import get from 'styles/getStyle';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DnDCalendar = withDragAndDrop(ReactBigCalendar);

export const BigCalendar = styled(DnDCalendar)`
  &.rbc-calendar {
    height: calc(100vh - 128px);
  }
`;
