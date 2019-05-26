import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import withProject, { IWithProject } from './store/withProject';
import { Navbar, Loader } from 'components';
import { ProjectWrapperContainer, ProjectImage, ProjectName, ProjectContent } from './styles';

const navItems = [
  {
    key: 'news',
    label: 'Aktualności',
  },
  {
    key: 'members',
    label: 'Członkowie',
  },
  {
    key: 'materials',
    label: 'Materiały',
  },
];

const ProjectWrapper: React.FC<IProps> = ({ match, location, history, project, projectLoading, children }) => {
  if (projectLoading) return <Loader />;

  const pathnameArr = location.pathname.split('/');

  if (pathnameArr.length === 3) {
    history.replace(location.pathname + '/news');
    return null;
  }

  const path = location.pathname.split('/')[3];
  const pathBase = pathnameArr.slice(0, pathnameArr.length - 1).join('/');

  return (
    <ProjectWrapperContainer>
      <Navbar path={path} pathBase={pathBase} navItems={navItems}>
        <ProjectImage src={project.image} />
        <ProjectName>{project.name}</ProjectName>
      </Navbar>
      <ProjectContent>{children}</ProjectContent>
    </ProjectWrapperContainer>
  );
};

interface IProps extends IWithProject, RouteComponentProps<{ projectURL: string }> {
  children: React.ReactElement;
}

export default withRouter(withProject(ProjectWrapper));
