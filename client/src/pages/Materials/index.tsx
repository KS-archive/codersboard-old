import React from 'react';
import { Typography, Spin } from 'antd';
import { QueryResult } from 'react-apollo';
import MaterialsQuery from 'store/material/queries/Materials';
import MaterialByAreaQuery, { Data } from 'store/material/queries/MaterialsByArea';
import MaterialCard from './MaterialCard';
import { MaterialsContainer, Header, AddButton, Grid } from './styles';

const { Title } = Typography;

const Query = (props: QueryProps) => {
  return props.area ? (
    <MaterialByAreaQuery variables={{ area: props.area }}>{props.children}</MaterialByAreaQuery>
  ) : (
    <MaterialsQuery>{props.children}</MaterialsQuery>
  );
};

const Materials = (props: Props) => {
  return (
    <MaterialsContainer>
      <Header>
        {props.area ? '' : <Title level={2}>Materiały</Title>}
        <AddButton type="primary">Dodaj materiał</AddButton>
      </Header>
      <Query area={props.area}>
        {({ data, loading }) => {
          return (
            <Spin tip="Wczytywanie materiałów..." spinning={loading}>
              <Grid>
                {data.materials &&
                  data.materials.map((material: any) => <MaterialCard key={material.id} {...material} />)}
              </Grid>
            </Spin>
          );
        }}
      </Query>
    </MaterialsContainer>
  );
};

interface Props {
  area: string;
}

interface QueryProps {
  area?: string;
  children: (data: QueryResult<Data>) => React.ReactElement;
}
export default Materials;
