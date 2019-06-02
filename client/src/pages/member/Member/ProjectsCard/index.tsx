import React from 'react';
import { List } from 'antd';

import CardBase from '../CardBase';
import Project from './Project';
import { ProjectsList } from './styles';

const ProjectsCard: React.FC<IProps> = ({ projects }) => {
  return (
    <CardBase title="Projekty">
      <ProjectsList>
        <List
          rowKey="id"
          itemLayout="vertical"
          dataSource={projects}
          renderItem={project => (
            <Project {...project} />
          )}
        />
      </ProjectsList>
    </CardBase>
  );
};

interface IProps {
  projects: {
    id: string;
    project: {
      id: string;
      url: string;
      name: string;
      image: string;
      __typename: 'Project';
    };
    role: string;
    responsibilities: string;
    __typename: 'ProjectMember';
  }[];
}

ProjectsCard.defaultProps = {
  projects: [],
};

export default ProjectsCard;
