import React from 'react';
import { Avatar } from 'antd';
import moment from 'moment';
import { H4, HeaderWrapper } from './styles';

const Header = (props: Props) => {
  console.log(props.avatar);
  return (
    <HeaderWrapper>
      <Avatar src={props.avatar || null} icon={props.avatar ? null : 'user'} />
      <h1>{props.title}</h1>
      <H4>{moment(props.date).format('DD.MM.YYYY HH:mm')}</H4>
    </HeaderWrapper>
  );
};

interface Props {
  avatar: string;
  title: string;
  content: string;
  date: Date;
  id: string;
}

export default Header;
