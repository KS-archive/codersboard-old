import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const AREAS = gql`
  {
    areas {
      id
      name
      image
    }
  }
`;


interface IArea {
  id: string;
  name: string;
  image: string;
}

interface IData {
  areas: IArea[];
}

interface IProps {
  children: (result: QueryResult<IData, {}>) => React.ReactNode
}

const AreasQuery: React.FC<IProps> = ({ children }) => <Query query={AREAS}>{children}</Query>;

export default AreasQuery;
