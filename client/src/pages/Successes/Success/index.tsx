import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip, Dropdown, Menu } from 'antd';

import { ReactComponent as EllipsisV } from 'static/fa/regular/ellipsis-v.svg';

import useEditAccess from '../hooks/useEditAccess';
import { ISuccess } from '../store/withSuccesses';
import Dot from './Dot';
import { SuccessContainer, EditIcon, Content, Name, DateString, Description, Users, Project } from './styles';

const Success: React.FC<IProps> = ({ name, description, date, type, users, project, creator, onEdit, onDelete }) => {
  const hasEditAccess = useEditAccess(creator);
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
            <Link to={`/projects/${project.url}`}>
              <Tooltip title={project.name} placement="right">
                <img src={project.image} alt={project.name} />
              </Tooltip>
            </Link>
          </Project>
        )}
      </Content>
      {hasEditAccess && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={onEdit}>Edytuj sukces</Menu.Item>
              <Menu.Item onClick={onDelete}>Usuń sukces</Menu.Item>
            </Menu>
          }
        >
          <EditIcon icon={EllipsisV} color="color-grayscale-grey" size={24} />
        </Dropdown>
      )}
    </SuccessContainer>
  );
};

interface IProps extends ISuccess {
  onEdit: () => void;
  onDelete: () => void;
}

export default Success;
