import styled from 'styled-components';
import { Input } from 'antd';

export const MembersContainer = styled.div`
  border-style: none;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Search = styled(Input.Search)`
  width: 200px;
  margin-left: auto;
`;
