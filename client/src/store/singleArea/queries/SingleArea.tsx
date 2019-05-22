import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const AREA = gql`
  query AREA($areaURL: String!) {
    areas(where: { areaURL: $areaURL }) {
      id
      areaURL
      name
      image
      description
      color
    }
  }
`;

export const withAreas = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={AREA}>{({ data }) => <WrapperComponent {...props} areas={data.areas} />}</Query>
);

export default (props: Props) => {
  return (
    <Query<Data, {}> query={AREA} variables={props.area}>
      {props.children}
    </Query>
  );
};

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
  area: object;
}

export interface AreaProps {
  id: string;
  areaURL: string;
  name: string;
  image: string;
  description: string;
  color: string;
}

export interface Data {
  areas: AreaProps[];
}
