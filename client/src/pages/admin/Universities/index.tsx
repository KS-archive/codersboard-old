import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { Icon } from 'components';
import UniversitiesQuery from 'store/university/queries/Universities';
import { ReactComponent as TrashAlt } from 'static/fa/regular/trash-alt.svg';
import { ReactComponent as Edit } from 'static/fa/regular/edit.svg';
import * as styles from './styles';

const { UniversitiesContainer, Header, AddButton, UniversityCard } = styles;
const { Title } = Typography;
const { Meta } = Card;

const Universities = () => {
  return (
    <UniversitiesContainer>
      <Header>
        <Title level={2}>Zarządzaj uczelniami</Title>
        <AddButton type="primary">Dodaj uczelnię</AddButton>
      </Header>
      <UniversitiesQuery>
        {({ data, loading }) => (
          <Row gutter={24}>
            {data.universities &&
              data.universities.map(u => (
                <Col xs={24} md={12} xl={8} xxl={6}>
                  <UniversityCard
                    actions={[<Icon icon={Edit} />, <Icon icon={TrashAlt} />]}
                    cover={<img alt="example" src={u.image} />}
                  >
                    <Meta title={u.name} description={`Członkowie: ${u.users.length}`} />
                  </UniversityCard>
                </Col>
              ))}
          </Row>
        )}
      </UniversitiesQuery>
    </UniversitiesContainer>
  );
};

export default Universities;
