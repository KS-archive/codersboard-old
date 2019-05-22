import React from 'react';
import styled from 'styled-components';
import get from 'styles/getStyle';
import { Color } from 'types';

const IconContainer = styled.div<{ size?: number; color?: Color | string }>`
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
    fill: ${props => props.color.includes('color') ? get(props.color as Color) : props.color};
  }
`;

const Icon = ({ icon: Component, ...props }: IIcon) => (
  <IconContainer {...props}>
    <Component />
  </IconContainer>
);

Icon.defaultProps = {
  size: 16,
  color: 'color-text-regular',
  onClick: (e: React.MouseEvent) => {},
};

type IIcon = {
  className?: string;
  size?: number;
  color?: Color;
  icon: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
};

export default Icon;
