import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Tag, Spin } from 'antd';
import { shorten } from 'utils';
import withProjects, { IWithProjects, IProject } from './store/withProjects';
import { ProjectsContainer, Header, AddButton, ProjectCard, CoverImage, Description, Grid } from './styles';

const { Title } = Typography;
const { Meta } = Card;

const getStatusTag = (status: string): React.ReactElement => {
  switch (status) {
    case 'DRAFT':
      return <Tag>Szkic</Tag>;
    case 'STARTING':
      return <Tag color="gold">Rozpoczynający się</Tag>;
    case 'IN_PROGRESS':
      return <Tag color="blue">W trakcie</Tag>;
    case 'CANCELLED':
      return <Tag color="red">Anulowany</Tag>;
    case 'DONE':
      return <Tag color="green">Ukończony</Tag>;
    case 'SUSPENDED':
      return <Tag color="volcano">Zawieszony</Tag>;
    default:
      return null;
  }
};

const getType = (type: string): string => {
  switch (type) {
    case 'SOFTWARE':
      return 'Aplikacja';
    case 'WEBSITE':
      return 'Strona internetowa';
    case 'EVENT':
      return 'Wydarzenie';
    case 'OTHER':
      return 'Inny';
    default:
      return '';
  }
};

const renderDescription = (props: IProject) => (
  <Description>
    <h4>
      <b>Typ: </b>
      {getType(props.type)}
    </h4>
    <p>{shorten(props.description, 120)}</p>
    <div>{getStatusTag(props.status)}</div>
  </Description>
);

const Projects: React.FC<IProps> = ({ projects = [], projectsLoading }) => (
  <ProjectsContainer>
    <Header>
      <Title level={2}>Projekty</Title>
      <AddButton type="primary">Stwórz projekt</AddButton>
    </Header>
    <Spin tip="Wczytywanie projektów" spinning={projectsLoading}>
      <Grid>
        {projects.map(project => (
          <Link key={project.id} to={`/projects/${project.url}`}>
            <ProjectCard hoverable cover={<CoverImage src={project.image} />}>
              <Meta title={project.name} description={renderDescription(project)} />
            </ProjectCard>
          </Link>
        ))}
      </Grid>
    </Spin>
  </ProjectsContainer>
);

interface IProps extends IWithProjects {}

export default withProjects(Projects);
