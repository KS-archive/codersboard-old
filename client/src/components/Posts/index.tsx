import React, { Fragment, useState } from 'react';
import { Spin, Modal } from 'antd';
import PostsQuery from 'store/post/queries/Posts';
import { withMe, MeProps } from 'store/user/queries/Me';
import Loader from '../Loader';
import { PostsList, AddPostBtn, PostsWrapper } from './styles';
import PostsListItem from './PostsListItem';
import AddPost from './AddPost';

const Posts = (props: Props) => {
  const [modal, showModal] = useState(false);

  return (
    <Fragment>
      <PostsQuery variables={{ area: props.area }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader />;
          if (error) return <div>{error.message}</div>;
          return (
            <PostsWrapper>
              <AddPostBtn type="primary" onClick={(): void => showModal(true)}>
                Dodaj nowy post
              </AddPostBtn>
              <PostsList
                dataSource={data.posts}
                itemLayout="horizontal"
                renderItem={(item: Item) => (
                  <PostsListItem
                    title={item.title}
                    content={item.content}
                    avatar={item.user.image}
                    date={item.date}
                    id={item.id}
                  />
                )}
              />
            </PostsWrapper>
          );
        }}
      </PostsQuery>
      <Modal title="Dodaj nowy post" footer={null} visible={modal} onCancel={(): void => showModal(false)}>
        <AddPost area={props.area} hideModal={() => showModal(false)} />
      </Modal>
    </Fragment>
  );
};

interface Item {
  title?: string;
  content?: string;
  user?: {
    id: string;
    image: string;
  };
  date?: Date;
  id?: string;
}

interface Props {
  me: MeProps;
  area: string;
}

export default withMe(Posts);
