import styled from 'styled-components';
import { Button } from 'antd';
import get from 'styles/getStyle';

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
