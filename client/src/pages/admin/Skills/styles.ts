import styled from 'styled-components';
import { Button, Card } from 'antd';
import get from 'styles/getStyle';

export const SkillsContainer = styled.div`
  border-style: none;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;

export const SkillCard = styled(Card)`
  width: 100%;
  margin-top: ${get('space-24')};

  .ant-card-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${get('space-24')};

    img {
      height: 48px;
      width: unset;
    }
  }
`;
