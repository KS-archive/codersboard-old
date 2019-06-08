import React from 'react';
import Loader from 'components/Loader';
import Posts from './index';
import { withAreaPosts, IWithPosts } from './store/withPosts';

const AreaPosts: React.FC<IProps> = ({ posts, postsLoading }) => (postsLoading ? <Loader /> : <Posts posts={posts} />);

interface IProps extends IWithPosts {}

export default withAreaPosts(AreaPosts);
