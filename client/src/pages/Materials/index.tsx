import React from 'react';
import { Typography, Card, Row, Col, Tag } from 'antd';
import { Icon } from 'components';
import MaterialsQuery, { MaterialProps } from 'store/material/queries/Materials';
import { ReactComponent as TrashAlt } from 'static/fa/regular/trash-alt.svg';
import { ReactComponent as Edit } from 'static/fa/regular/edit.svg';
import * as styles from './styles';

const { MaterialsContainer, Header, AddButton, MaterialCard, Description } = styles;
const { Title } = Typography;
const { Meta } = Card;

const renderDescription = (props: MaterialProps) => {
  console.log(typeof props.tags[0].name);
  return (
    <Description>
      <p>{props.description}</p>
      <div>
        {props.tags.map(tag => <Tag key={tag.name} color={tag.color}>{tag.name}</Tag>)}
      </div>
    </Description>
  );
}

const Materials = () => {
  return (
    <MaterialsContainer>
      <Header>
        <Title level={2}>Materiały</Title>
        <AddButton type="primary">Dodaj materiał</AddButton>
      </Header>
      <MaterialsQuery>
        {({ data, loading }) => (
          <Row gutter={24}>
            {data.materials &&
              data.materials.map(material => (
                <Col key={material.id} xs={24} md={12} xl={8} xxl={6}>
                  <MaterialCard
                    actions={[<Icon icon={Edit} />, <Icon icon={TrashAlt} />]}
                    cover={<img alt={material.title} src={material.image} />}
                  >
                    <Meta title={material.title} description={renderDescription(material)} />
                  </MaterialCard>
                </Col>
              ))}
          </Row>
        )}
      </MaterialsQuery>
    </MaterialsContainer>
  );
};

interface DescriptionProps {

}

export default Materials;
