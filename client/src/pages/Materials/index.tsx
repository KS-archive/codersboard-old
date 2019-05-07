import React from 'react';
import { Typography, Card, Tag } from 'antd';
import MaterialsQuery, { MaterialProps } from 'store/material/queries/Materials';
import { withMyCredentials, CredentialsProps } from 'store/user/queries/MyCredentials';
import * as styles from './styles';

const { MaterialsContainer, Header, AddButton, MaterialCard, CoverImage, Description, Grid } = styles;
const { Title } = Typography;
const { Meta } = Card;

const shorten = (str: string, maxLen: number) => str.length > maxLen ? `${str.substring(0, maxLen - 3)}...` : str;

const renderDescription = (props: MaterialProps) => {
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

const Materials = (props: Props) => {
  const credentialsIds = props.myCredentials.map(c => c.id);

  return (
    <MaterialsContainer>
      <Header>
        <Title level={2}>Materiały</Title>
        <AddButton type="primary">Dodaj materiał</AddButton>
      </Header>
      <MaterialsQuery>
        {({ data, loading }) => {
          return (
            <Grid>
              {data.materials &&
                data.materials.map(material => (
                  <a href={material.url} target="__blank">
                    <MaterialCard
                      key={material.id}
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
      </MaterialsQuery>
    </MaterialsContainer>
  );
};

interface Props {
  myCredentials: CredentialsProps[];
}

export default withMyCredentials(Materials);
