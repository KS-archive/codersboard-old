import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card } from 'antd';
import AreasQuery from 'store/area/queries/Areas';
import * as styles from './styles';

const { AreasContainer, Header, AddButton, AreaCard, CoverImage, Grid } = styles;
const { Title } = Typography;
const { Meta } = Card;

const shorten = (str: string, maxLen: number) => (str.length > maxLen ? `${str.substring(0, maxLen - 3)}...` : str);

const Areas = () => {
  return (
    <AreasContainer>
      <Header>
        <Title level={2}>Obszary</Title>
        <AddButton type="primary">Stwórz nowy obszar</AddButton>
      </Header>
      <AreasQuery>
        {({ data, loading }) => {
          return (
            <Grid>
              {data.areas &&
                data.areas.map(area => (
                  <Link key={area.id} to={`/areas/${area.areaURL}`}>
                    <AreaCard hoverable cover={<CoverImage src={area.image} />}>
                      <Meta title={area.name} description={shorten(area.description, 120)} />
                    </AreaCard>
                  </Link>
                ))}
            </Grid>
          );
        }}
      </AreasQuery>
    </AreasContainer>
  );
};

export default Areas;
