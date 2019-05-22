import styled from 'styled-components';
import { List, Button } from 'antd';

export const PostsList = styled(List)`
  width: 100%;
`;

export const AddPostBtn = styled(Button)`
  align-self: flex-end;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
  }
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
