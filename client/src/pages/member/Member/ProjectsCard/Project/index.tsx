import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { ProjectContainer, Image, Content } from './styles';

const { Meta } = Card;

const Project: React.FC<IProps> = ({ role, responsibilities, project: { url, name, image } }) => {
  return (
    <ProjectContainer>
      <Meta
        avatar={<Image src={image} />}
        title={<Link to={`/projects/${url}`}>{name}</Link>}
        description={role}
      />
      <Content>{responsibilities}</Content>
    </ProjectContainer>
  );
};

interface IProps {
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
}

export default Project;
