import gql from 'graphql-tag';
import { apollo } from 'utils';
import { EVENTS, EventType } from './withEvents';

const CREATE_EVENT = gql`
  mutation createEvent($data: EventCreateInput!) {
    createEvent(data: $data) {
      id
    }
  }
`;

interface ICreateEventResponse {
  createEvent: {
    id: string;
  };
}

export interface IEventValues {
  id?: string;
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  attendees?: string[];
  location?: string;
  url?: string;
  projectId?: string;
  areaId?: string;
  type?: EventType;
}

export default async (variables: IEventValues) => {
  const data: any = {
    ...variables,
    attendees: {
      connect: variables.attendees.map(id => ({ id })),
    },
  };

  if (variables.projectId) {
    data.project = { connect: { id: variables.projectId } };
  }

  if (variables.areaId) {
    data.area = { connect: { id: variables.areaId } };
  }

  delete data.projectId;
  delete data.areaId;

  const response: ICreateEventResponse = await apollo.mutate({
    mutation: CREATE_EVENT,
    variables: { data },
    refetchQueries: [{ query: EVENTS }],
  });

  return response;
};
