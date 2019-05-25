import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { Icon } from 'components';
import { ReactComponent as TrashAlt } from 'static/fa/regular/trash-alt.svg';
import { ReactComponent as Edit } from 'static/fa/regular/edit.svg';
import withUniversities, { IWithUniversities } from './store/withUniversities';
import { UniversitiesContainer, Header, AddButton, UniversityCard } from './styles';

const { Title } = Typography;
const { Meta } = Card;

const Universities: React.FC<IProps> = ({ universities = [], universitiesLoading }) => (
  <UniversitiesContainer>
    <Header>
      <Title level={2}>Zarządzaj uczelniami</Title>
      <AddButton type="primary">Dodaj uczelnię</AddButton>
    </Header>
    <Row gutter={24}>
      {universities.map(u => (
        <Col key={u.id} xs={24} md={12} xl={8} xxl={6}>
          <UniversityCard
            actions={[<Icon icon={Edit} />, <Icon icon={TrashAlt} />]}
            cover={<img alt="example" src={u.image} />}
          >
            <Meta title={u.name} description={`Członkowie: ${u.users.length}`} />
          </UniversityCard>
        </Col>
      ))}
    </Row>
  </UniversitiesContainer>
);

interface IProps extends IWithUniversities {}

export default withUniversities(Universities);
