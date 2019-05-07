import styled from 'styled-components';
import { Button, Card } from 'antd';
import get from 'styles/getStyle';

export const MaterialsContainer = styled.div`
  border-style: none;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;

export const MaterialCard = styled(Card)`
  margin-top: ${get('space', 'lg')};
`;

export const Description = styled.div`
  > p {
    height: 80px;
  }
`;

// margin-top: ${get('space', 'lg')};

//   .ant-card-cover {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: ${get('space', 'lg')};

//     img {
//       height: 48px;
//       width: unset;
//     }
//   }
