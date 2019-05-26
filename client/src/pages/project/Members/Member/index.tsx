import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { IMember } from '../store/withMembers';
import { MemberContainer, Content } from './styles';

const { Meta } = List.Item;

const Member: React.FC<IProps> = ({ user: { image, fullName, profileURL }, role }) => {
  return (
    <MemberContainer actions={[<div>Usuń</div>, <div>Edytuj</div>]}>
      <Meta
        avatar={<Avatar src={image} size={40} />}
        title={<Link to={`/members/${profileURL}`}>{fullName}</Link>}
        description={role}
      />
      <Content>Some content</Content>
    </MemberContainer>
  );
};

interface IProps extends IMember {}

export default Member;
