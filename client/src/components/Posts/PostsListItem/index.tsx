import React from 'react';
import { Collapse } from 'antd';
import Header from './Header';

const { Panel } = Collapse;

const PostsListItem = (props: Props) => {
  return (
    <Collapse bordered={false}>
      <Panel header={<Header {...props} />} key={props.id}>
        <div>{props.content}</div>
      </Panel>
    </Collapse>
  );
};

interface Props {
  avatar: string;
  title: string;
  content: string;
  date: Date;
  id: string;
}

export default PostsListItem;
