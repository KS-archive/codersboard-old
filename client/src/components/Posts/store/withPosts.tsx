import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export const PROJECT_POSTS = gql`
  query POSTS($projectURL: String!) {
    posts(orderBy: date_DESC, where: { project: { url: $projectURL } }) {
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
export const AREA_POSTS = gql`
  query POSTS($areaURL: String!) {
    posts(orderBy: date_DESC, where: { area: { url: $areaURL } }) {
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
  areaURL?: string;
  projectURL?: string;
}

export const withAreaPosts = (WrapperComponent: any) => (props: RouteComponentProps<{ areaURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={AREA_POSTS} variables={{ areaURL: props.match.params.areaURL }}>
    {({ data, loading }) => <WrapperComponent {...props} posts={data.posts} postsLoading={loading} />}
  </Query>
);

export const withProjectPosts = (WrapperComponent: any) => (props: RouteComponentProps<{ projectURL: string }>) => (
  <Query<IData, IQueryVaraibles> query={PROJECT_POSTS} variables={{ projectURL: props.match.params.projectURL }}>
    {({ data, loading }) => <WrapperComponent {...props} posts={data.posts} postsLoading={loading} />}
  </Query>
);
