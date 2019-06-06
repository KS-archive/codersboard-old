import gql from 'graphql-tag';
import { apollo, omit } from 'utils';
import { EVENTS } from './withEvents';
import { IEventValues } from './createEvent';

const UPDATE_EVENT = gql`
  mutation updateEvent($data: EventUpdateInput!, $where: EventWhereUniqueInput!) {
    updateEvent(data: $data, where: $where) {
      id
    }
  }
`;

interface IUpdateEventResponse {
  updateEvent: {
    id: string;
  };
}

export default async (variables: IEventValues) => {
  const data: any = {
    ...omit(variables, ['id']),
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

  const where = { id: variables.id };

  const response: IUpdateEventResponse = await apollo.mutate({
    mutation: UPDATE_EVENT,
    variables: { data, where },
    refetchQueries: [{ query: EVENTS }],
  });

  return response;
};
