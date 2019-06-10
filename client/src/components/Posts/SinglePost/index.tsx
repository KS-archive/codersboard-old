import React from 'react';
import { Comment, Tooltip, Avatar, Typography, Divider } from 'antd';
import moment from 'moment';

const { Title } = Typography;

const SinglePost: React.FC<IProps> = ({ avatar, title, content, date, author }) => {
  return (
    <>
      <Comment
        author={<a href={`/members/${author.profileURL}`}>{author.fullName}</a>}
        avatar={<Avatar src={avatar} icon={avatar ? null : 'user'} />}
        content={
          <>
            <Title level={4}>{title}</Title>
            <p>{content}</p>
          </>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(date).fromNow()}</span>
          </Tooltip>
        }
      />
      <Divider type="horizontal" />
    </>
  );
};

interface IProps {
  avatar: string;
  title: string;
  content: string;
  date: Date;
  author: {
    fullName: string;
    profileURL: string;
  };
}

export default SinglePost;
