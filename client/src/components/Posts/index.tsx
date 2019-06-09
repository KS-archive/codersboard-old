import React, { useState } from 'react';
import { Modal } from 'antd';
import withMe, { IMe } from './store/withMe';
import { IWithPosts } from './store/withPosts';
import { PostsList, AddPostBtn, PostsWrapper } from './styles';
import SinglePost from './SinglePost';
import AddPost from './AddPost';

const Posts: React.FC<IProps> = props => {
  const [modal, showModal] = useState(false);

  return (
    <>
      <PostsWrapper>
        <AddPostBtn type="primary" onClick={(): void => showModal(true)}>
          Dodaj nowy post
        </AddPostBtn>
        <PostsList
          dataSource={props.posts}
          itemLayout="horizontal"
          renderItem={(item: Item) => (
            <SinglePost
              title={item.title}
              content={item.content}
              avatar={item.user.image}
              date={item.date}
              author={{ fullName: item.user.fullName, profileURL: item.user.profileURL }}
            />
          )}
        />
      </PostsWrapper>

      <Modal title="Dodaj nowy post" footer={null} visible={modal} onCancel={(): void => showModal(false)}>
        <AddPost hideModal={() => showModal(false)} />
      </Modal>
    </>
  );
};

interface Item {
  title?: string;
  content?: string;
  user?: {
    id: string;
    image: string;
    fullName: string;
    profileURL: string;
  };
  date?: Date;
  id?: string;
}

interface IProps extends IWithPosts {
  me: IMe;
  area: string;
}

export default withMe(Posts);
