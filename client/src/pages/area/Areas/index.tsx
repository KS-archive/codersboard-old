import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Spin } from 'antd';
import { shorten } from 'utils';
import withAreas, { IWithAreas } from './store/withAreas';
import * as styles from './styles';

const { AreasContainer, Header, AddButton, AreaCard, CoverImage, Grid } = styles;
const { Title } = Typography;
const { Meta } = Card;

const Areas: React.FC<IProps> = ({ areas = [], areasLoading }) => (
  <AreasContainer>
    <Header>
      <Title level={2}>Obszary</Title>
      <AddButton type="primary">Stwórz nowy obszar</AddButton>
    </Header>
    <Spin tip="Wczytywanie obszarów..." spinning={areasLoading}>
      <Grid>
        {areas.map(area => (
          <Link key={area.id} to={`/areas/${area.areaURL}/news`}>
            <AreaCard hoverable cover={<CoverImage src={area.image} />}>
              <Meta title={area.name} description={shorten(area.description, 120)} />
            </AreaCard>
          </Link>
        ))}
      </Grid>
    </Spin>
  </AreasContainer>
);

interface IProps extends IWithAreas {}

export default withAreas(Areas);
