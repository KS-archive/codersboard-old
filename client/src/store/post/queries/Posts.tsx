import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const POSTS = gql`
  query POSTS($area: String!) {
    posts(orderBy: date_DESC, where: { area: { areaURL: $area } }) {
      id
      title
      content
      date
      area {
        name
        areaURL
      }
      user {
        id
        image
      }
    }
  }
`;

export const withPosts = (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={POSTS} variables={props.variables}>
    {({ data }) => <WrapperComponent {...props} areas={data.posts} />}
  </Query>
);

export default (props: Props) => {
  console.log(props);
  return (
    <Query<Data, {}> query={POSTS} variables={props.variables}>
      {props.children}
    </Query>
  );
};

interface Props {
  children: (data: QueryResult<Data>) => React.ReactElement;
  variables: {
    area: string;
  };
}

interface PostProps {
  title: string;
  content: string;
  date: Date;
  area: {
    name: any;
  };
}

interface Data {
  posts: PostProps[];
}
