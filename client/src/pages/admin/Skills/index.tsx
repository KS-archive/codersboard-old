import React from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import { Icon } from 'components';
import withSkills, { IWithSkills } from './store/withSkills';
import { ReactComponent as TrashAlt } from 'static/fa/regular/trash-alt.svg';
import { ReactComponent as Edit } from 'static/fa/regular/edit.svg';
import SkillNoIcon from 'static/skill-no-icon.svg';
import * as styles from './styles';

const { SkillsContainer, Header, AddButton, SkillCard } = styles;
const { Title } = Typography;
const { Meta } = Card;

const Skills: React.FC<IProps> = ({ skills }) => {
  return (
    <SkillsContainer>
      <Header>
        <Title level={2}>Zarządzaj umiejętnościami</Title>
        <AddButton type="primary">Dodaj umiejętność</AddButton>
      </Header>
      <Row gutter={24}>
        {skills &&
          skills.map(skill => (
            <Col key={skill.id} xs={24} md={12} xl={6} xxl={4}>
              <SkillCard actions={[<Icon icon={Edit} />, <Icon icon={TrashAlt} />]}>
                <Meta
                  title={skill.name}
                  avatar={<Avatar size={40} src={skill.icon || SkillNoIcon} shape="square" />}
                  description={`${skill.users.length} członków`}
                />
              </SkillCard>
            </Col>
          ))}
      </Row>
    </SkillsContainer>
  );
};

interface IProps extends IWithSkills {}

export default withSkills(Skills);
