import React from 'react';
import styled from 'styled-components';
import { Color } from 'types/styled';
import get from 'styles/getStyle';

const IconContainer = styled.div<{ size?: number; color?: Color }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;

  svg,
  path,
  rect {
    width: 100%;
    height: 100%;
    fill: ${props => get('color', props.color)(props)};
  }
`;

const Icon = ({ icon: Component, size, color, onClick, className }: Props) => (
  <IconContainer size={size} color={color} onClick={onClick} className={className}>
    <Component />
  </IconContainer>
);

Icon.defaultProps = {
  size: 16,
  color: 'regularText',
  onClick: (e: React.MouseEvent) => {},
};

type Props = {
  className?: string;
  size?: number;
  color?: Color;
  icon: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
};

export default Icon;
