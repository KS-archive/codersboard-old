import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Tag } from 'antd';
import ProjectsQuery, { ProjectProps } from 'store/project/queries/Projects';
import * as styles from './styles';

const { ProjectsContainer, Header, AddButton, ProjectCard, CoverImage, Description, Grid } = styles;
const { Title } = Typography;
const { Meta } = Card;

const shorten = (str: string, maxLen: number) => str.length > maxLen ? `${str.substring(0, maxLen - 3)}...` : str;

const getStatusTag = (status: string): React.ReactElement => {
  switch (status) {
    case 'DRAFT': return <Tag>Szkic</Tag>;
    case 'STARTING': return <Tag color="gold">Rozpoczynający się</Tag>;
    case 'IN_PROGRESS': return <Tag color="blue">W trakcie</Tag>;
    case 'CANCELLED': return <Tag color="red">Anulowany</Tag>;
    case 'DONE': return <Tag color="green">Ukończony</Tag>;
    case 'SUSPENDED': return <Tag color="volcano">Zawieszony</Tag>;
    default: return null;
  }
}

const getType = (type: string): string => {
  switch (type) {
    case 'SOFTWARE': return 'Aplikacja';
    case 'WEBSITE': return 'Strona internetowa';
    case 'EVENT': return 'Wydarzenie';
    case 'OTHER': return 'Inny';
    default: return '';
  }
}

const renderDescription = (props: ProjectProps) => {
  return (
    <Description>
      <h4><b>Typ: </b>{getType(props.type)}</h4>
      <p>{shorten(props.description, 120)}</p>
      <div>
        {getStatusTag(props.status)}
      </div>
    </Description>
  );
};

const Projects = () => {
  return (
    <ProjectsContainer>
      <Header>
        <Title level={2}>Projekty</Title>
        <AddButton type="primary">Stwórz projekt</AddButton>
      </Header>
      <ProjectsQuery>
        {({ data, loading }) => {
          return (
            <Grid>
              {data.projects &&
                data.projects.map(project => (
                  <Link key={project.id} to={`/projects/${project.projectURL}`}>
                    <ProjectCard
                      hoverable
                      cover={
                        <CoverImage src={project.image} />
                      }
                    >
                      <Meta title={project.name} description={renderDescription(project)} />
                    </ProjectCard>
                  </Link>
                ))}
            </Grid>
          );
        }}
      </ProjectsQuery>
    </ProjectsContainer>
  );
};

export default Projects;
