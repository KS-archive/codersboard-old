import React from 'react';
import { Typography, Card, Tag } from 'antd';
import MaterialsQuery, { Data } from 'store/material/queries/Materials';
import MaterialByAreaQuery, { MaterialByAreaProps } from 'store/material/queries/MaterialsByArea';
import { withMyCredentials, CredentialsProps } from 'store/user/queries/MyCredentials';
import { QueryResult } from 'react-apollo';
import Loader from 'components/Loader';
import * as styles from './styles';

const { MaterialsContainer, Header, AddButton, MaterialCard, CoverImage, Description, Grid } = styles;
const { Title } = Typography;
const { Meta } = Card;

const shorten = (str: string, maxLen: number) => (str.length > maxLen ? `${str.substring(0, maxLen - 3)}...` : str);

const renderDescription = (props: MaterialByAreaProps) => {
  return (
    <Description>
      <p>{shorten(props.description, 120)}</p>
      <div>
        {props.tags.map(tag => (
          <Tag key={tag.name} color={tag.color}>
            {tag.name}
          </Tag>
        ))}
      </div>
    </Description>
  );
};

const Query = (props: QueryProps) => {
  return props.area ? (
    <MaterialByAreaQuery variables={{ area: props.area }}>{props.children}</MaterialByAreaQuery>
  ) : (
    <MaterialsQuery>{props.children}</MaterialsQuery>
  );
};

const Materials = (props: Props) => {
  const credentialsIds = props.myCredentials.map(c => c.id);

  return (
    <MaterialsContainer>
      <Header>
        {props.area ? '' : <Title level={2}>Materiały</Title>}
        <AddButton type="primary">Dodaj materiał</AddButton>
      </Header>
      <Query area={props.area}>
        {({ data, loading }) => {
          if (loading) return <Loader />;
          return (
            <Grid>
              {data.materials &&
                data.materials.map(material => (
                  <a key={material.id} href={material.url} target="__blank">
                    <MaterialCard
                      hoverable
                      cover={
                        <CoverImage locked={!credentialsIds.includes(material.credential.id)} src={material.image} />
                      }
                    >
                      <Meta title={material.title} description={renderDescription(material)} />
                    </MaterialCard>
                  </a>
                ))}
            </Grid>
          );
        }}
      </Query>
    </MaterialsContainer>
  );
};

interface Props {
  myCredentials: CredentialsProps[];
  area: string;
}

interface QueryProps {
  area?: string;
  children: (data: QueryResult<Data>) => React.ReactElement;
}

export default withMyCredentials(Materials);
