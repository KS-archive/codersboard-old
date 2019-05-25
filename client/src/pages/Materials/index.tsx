import React from 'react';
import { Typography, Spin } from 'antd';
import withMaterials, { IWithMaterials } from './store/withMaterials';
import MaterialCard from './MaterialCard';
import { MaterialsContainer, Header, AddButton, Grid } from './styles';

const { Title } = Typography;

const Materials: React.FC<IProps> = ({ materials = [], materialsLoading }) => {
  return (
    <MaterialsContainer>
      <Header>
        <Title level={2}>Materiały</Title>
        <AddButton type="primary">Dodaj materiał</AddButton>
      </Header>
      <Spin tip="Wczytywanie materiałów..." spinning={materialsLoading}>
        <Grid>
          {materials.map((material) => <MaterialCard key={material.id} {...material} />)}
        </Grid>
      </Spin>
    </MaterialsContainer>
  );
};

interface IProps extends IWithMaterials {}

export default withMaterials(Materials);
