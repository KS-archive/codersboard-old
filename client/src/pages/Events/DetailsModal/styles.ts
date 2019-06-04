import styled from 'styled-components';
import { Modal, Button } from 'antd';
import get from 'styles/getStyle';

export const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-size: ${get('font-size-18')};
    color: ${get('color-text-primary')};
  }

  .ant-modal-footer {
    display: flex;
    align-items: center;

    > button:nth-child(3) {
      margin-left: auto;
    }
  }
`;

export const BasicData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${get('space-8')} ${get('space-16')};
  font-size: ${get('font-size-14')};
  color: ${get('color-text-regular')};

  > div:nth-child(1) {
    grid-area: 1/1/2/2;
  }

  > div:nth-child(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-child(3) {
    grid-area: 2/1/3/3;
  }
`;

export const Description = styled.p`
  margin: ${get('space-12')} 0;
  font-size: ${get('font-size-14')};
  color: ${get('color-text-secondary')};
`;

export const Attendees = styled.div`
  > div + div {
    margin-top: ${get('space-12')};
  }

  > div {
    strong {
      color: ${get('color-text-primary')};
    }

    > div {
      display: grid;
      grid-template-columns: repeat(auto-fill, 32px);
      grid-gap: ${get('space-8')};
      width: 100%;
      margin-top: ${get('space-4')};
    }
  }
`;

export const AcceptButton = styled(Button)`
  cursor: ${props => props.type === 'primary' && 'default'};
  pointer-events: ${props => props.type === 'primary' && 'none'};
  background-color: ${props => props.type === 'primary' && get('color-success')};
  border: ${props => props.type === 'primary' && get('color-success')};
  color: ${props => props.type === 'primary' && get('color-grayscale-white')};

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => (props.type === 'primary' ? get('color-success') : '#f6ffed')};
    border-color: ${get('color-success')};
    color: ${props => (props.type === 'primary' ? get('color-grayscale-white') : get('color-success'))};
  }
`;

export const DeclineButton = styled(Button)`
  cursor: ${props => props.type === 'primary' && 'default'};
  pointer-events: ${props => props.type === 'primary' && 'none'};
  background-color: ${props => props.type === 'primary' && get('color-danger')};
  border: ${props => props.type === 'primary' && get('color-danger')};
  color: ${props => props.type === 'primary' && get('color-grayscale-white')};

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => (props.type === 'primary' ? get('color-danger') : '#fff1f0')};
    border-color: ${get('color-danger')};
    color: ${props => (props.type === 'primary' ? get('color-grayscale-white') : get('color-danger'))};
  }
`;
