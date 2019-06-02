import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import get from 'styles/getStyle';
import { IColumn } from '..';

const ProjectsRendererCell = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 42.6px);
  grid-template-rows: repeat(auto-fill, 24px);
  grid-gap: ${get('space-8')};
  width: 100%;
  padding: ${get('space-8')};
`;

const Project = styled.img`
  width: 42.6px;
  height: 24px;
  border-radius: ${get('radius-4')};
`;

const ProjectsRenderer: React.FC<IColumn<IProject[]>> = ({ value }) => {
  return (
    <ProjectsRendererCell>
      {value.map(({ project: { id, name, image } }) => {
        return (
          <Tooltip key={id} title={name}>
            <Project src={image} />
          </Tooltip>
        );
      })}
    </ProjectsRendererCell>
  );
};

interface IProject {
  id: string;
  project: {
    id: string;
    name: string;
    image: string;
    __typename: 'Project';
  };
  __typename: 'ProjectMember';
}

export default {
  field: 'projects',
  headerName: 'Projekty',
  cellRendererFramework: ProjectsRenderer,
  width: 248,
};
