import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

const AREA = gql`
  query area($url: String!) {
    area(where: { url: $url }) {
      id
      name
      image
    }
  }
`;

export interface IArea {
  id: string;
  name: string;
  image: string;
}

interface IData {
  area: IArea;
}

export interface IWithArea extends IData {
  areaLoading: boolean;
}

interface IQueryVaraibles {
  url: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={AREA} variables={{ url: props.match.params.areaURL }}>
    {({ data, loading }) => <WrapperComponent {...props} area={data.area} areaLoading={loading} />}
  </Query>
);
