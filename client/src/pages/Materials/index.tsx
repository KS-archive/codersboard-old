import React from 'react';
import { Typography, Spin } from 'antd';
import MaterialsQuery from 'store/material/queries/Materials';
import MaterialCard from './MaterialCard';
import { MaterialsContainer, Header, AddButton, Grid } from './styles';

const { Title } = Typography;

const Materials: React.FC = () => {
  return (
    <MaterialsContainer>
      <Header>
        <Title level={2}>Materiały</Title>
        <AddButton type="primary">Dodaj materiał</AddButton>
      </Header>
      <MaterialsQuery>
        {({ data, loading }) => {
          return (
            <Spin tip="Wczytywanie materiałów..." spinning={loading}>
              <Grid>
                {data.materials && data.materials.map(material => <MaterialCard key={material.id} {...material} />)}
              </Grid>
            </Spin>
          );
        }}
      </MaterialsQuery>
    </MaterialsContainer>
  );
};
export default Materials;
