import React from 'react';
import Loader from 'components/Loader';
import Posts from './index';
import { withProjectPosts, IWithPosts } from './store/withPosts';

const ProjectPosts: React.FC<IProps> = ({ posts, postsLoading }) =>
  postsLoading ? <Loader /> : <Posts posts={posts} />;

interface IProps extends IWithPosts {}

export default withProjectPosts(ProjectPosts);
