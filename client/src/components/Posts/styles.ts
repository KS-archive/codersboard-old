import styled from 'styled-components';
import { List, Button } from 'antd';
import get from 'styles/getStyle';

export const PostsList = styled(List)`
  width: 100%;
`;

export const AddPostBtn = styled(Button)`
  align-self: flex-end;
  &:hover {
    cursor: pointer;
  }
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: ${get('space-12')};
  border-radius: ${get('radius-8')};
`;
