import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import withArea, { IWithArea } from './store/withArea';
import { Navbar, Loader } from 'components';
import { AreaWrapperContainer, AreaImage, AreaName, AreaContent } from './styles';

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

const AreaWrapper: React.FC<IProps> = ({ match, location, history, area, areaLoading, children }) => {
  if (areaLoading) return <Loader />;

  const pathnameArr = location.pathname.split('/');

  if (pathnameArr.length === 3) {
    history.replace(location.pathname + '/news');
    return null;
  }

  const path = location.pathname.split('/')[3];
  const pathBase = pathnameArr.slice(0, pathnameArr.length - 1).join('/');

  return (
    <AreaWrapperContainer>
      <Navbar path={path} pathBase={pathBase} navItems={navItems}>
        <AreaImage src={area.image} />
        <AreaName>{area.name}</AreaName>
      </Navbar>
      <AreaContent>{children}</AreaContent>
    </AreaWrapperContainer>
  );
};

interface IProps extends IWithArea, RouteComponentProps<{ areaURL: string }> {
  children: React.ReactElement;
}

export default withRouter(withArea(AreaWrapper));
