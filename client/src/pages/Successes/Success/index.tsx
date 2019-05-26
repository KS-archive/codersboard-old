import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip } from 'antd';

import { Icon } from 'components';
import { ReactComponent as Trophy } from 'static/fa/regular/trophy-alt.svg';
import { ReactComponent as Medal } from 'static/fa/regular/medal.svg';
import { ReactComponent as Newspaper } from 'static/fa/regular/newspaper.svg';

import { ISuccess, SuccessType } from '../store/withSuccesses';
import { SuccessContainer, DotContainer, Content, Name, DateString, Description, Users, Project } from './styles';

const dotConfigs = {
  EPIC: {
    color: '#faad14',
    icon: Trophy,
  },
  SMALL: {
    color: '#1890ff',
    icon: Medal,
  },
  NEWS: {
    color: '#13c2c2',
    icon: Newspaper,
  },
};

const Dot: React.FC<{ type: SuccessType }> = ({ type }) => {
  const { color, icon } = dotConfigs[type];

  return (
    <DotContainer color={color}>
      <Icon color="#fff" icon={icon} />
    </DotContainer>
  );
};

const Success: React.FC<IProps> = ({ name, description, date, type, users, project }) => {
  const localeDate = new Date(date).toLocaleString('pl-PL', { month: 'long', day: '2-digit', year: 'numeric' });

  return (
    <SuccessContainer dot={<Dot type={type} />}>
      <Content>
        <Name>{name}</Name>
        <DateString>{localeDate}</DateString>
        <Description>{description}</Description>
        {users.length && (
          <Users>
            <h4>Do sukcesu przyczynili się:</h4>
            {users.map(({ id, fullName, profileURL, image }) => (
              <Tooltip key={id} title={fullName}>
                <Link to={`/members/${profileURL}`}>
                  <Avatar src={image} />
                </Link>
              </Tooltip>
            ))}
          </Users>
        )}
        {project && (
          <Project>
            <h4>Sukces osiągnięty w ramach projektu:</h4>
            <Link to={`/projects/${project.projectURL}`}>
              <Tooltip title={project.name} placement="right">
                <img src={project.image} alt={project.name} />
              </Tooltip>
            </Link>
          </Project>
        )}
      </Content>
    </SuccessContainer>
  );
};

interface IProps extends ISuccess {}

export default Success;
