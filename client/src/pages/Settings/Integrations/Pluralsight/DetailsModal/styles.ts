import styled from 'styled-components';
import { Modal as AntdModal, Card } from 'antd';
import get from 'styles/getStyle';

export const Modal = styled(AntdModal)`
  .ant-modal-body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${get('space-24')};
  }
`;

export const Skill = styled(Card)`
  .ant-card-body > div {
    display: flex;
    align-items: center;

    strong {
      width: 88px;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: ${get('font-size-16')};
  }

  img {
    width: 80px;
    height: 80px;
  }
`;
