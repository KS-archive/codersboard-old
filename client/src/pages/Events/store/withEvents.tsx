import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const EVENTS = gql`
  {
    events {
      id
      title
      description
      start
      end
      image
      attendees {
        id
        user {
          id
          fullName
          image
          profileURL
        }
        status
      }
      location
      url
      project {
        id
        name
        image
        url
      }
      area {
        id
        name
        image
        url
      }
      type
      createdAt
      updatedAt
    }
  }
`;

export type AttendeeStatusType = 'YES' | 'NO';

export type EventType = 'OPEN' | 'PRIVATE';

export interface IEventAttendee {
  id: string;
  user: {
    id: string;
    fullName: string;
    image: string;
    profileURL: string;
  };
  status?: AttendeeStatusType;
}

export interface IEvent {
  id: string;
  title: string;
  description?: string;
  start?: string;
  end?: string;
  image?: string;
  attendees: IEventAttendee[];
  location?: string;
  url?: string;
  project?: {
    id: string;
    name: string;
    image: string;
    url: string;
  };
  area?: {
    id: string;
    name: string;
    image: string;
    url: string;
  };
  type: EventType;
  createdAt: string;
  updatedAt: string;
}

interface IData {
  events: IEvent[];
}

export interface IWithEvents extends IData {
  eventsLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={EVENTS}>{({ data, loading }) => <WrapperComponent {...props} events={data.events} eventsLoading={loading} />}</Query>
);
