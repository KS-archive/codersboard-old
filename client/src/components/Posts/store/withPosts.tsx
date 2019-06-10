import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const POSTS = gql`
  query POSTS($url: String!) {
    posts(orderBy: date_DESC, where: { OR: [{ area: { url: $url } }, { project: { url: $url } }] }) {
      id
      title
      content
      date
      area {
        name
        url
      }
      user {
        id
        image
        fullName
        profileURL
      }
    }
  }
`;

interface IPost {
  id: string;
  title: string;
  content: string;
  date: Date;
  area: {
    name: string;
    url: string;
  };
  user: {
    id: string;
    image: string;
    fullName: string;
    profileURL: string;
  };
}

interface IData {
  posts: IPost[];
}

export interface IWithPosts {
  posts: IPost[];
  postsLoading?: boolean;
}

interface IQueryVaraibles {
  url?: string;
}

export default (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL: string; projectURL: string }>) => (
  <Query<IData, IQueryVaraibles>
    query={POSTS}
    variables={{ url: props.match.params.areaURL || props.match.params.projectURL }}
  >
    {({ data, loading }) => <WrapperComponent {...props} posts={data.posts} postsLoading={loading} />}
  </Query>
);
