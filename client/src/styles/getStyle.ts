import { Color, FontSize, Space, Radius, Shadow } from 'types/styled';

const getColor = (colorName: Color) => (props: any) => props.theme.color[colorName];
const getFontSize = (size: FontSize) => (props: any) => props.theme.fontSize[size] + 'px';
const getSpace = (space: Space) => (props: any) => props.theme.space[space] + 'px';
const getRadius = (type: Radius = 'normal') => (props: any) => props.theme.radius[type] + 'px';
const getShadow = (type: Shadow = 'small') => (props: any) => props.theme.shadow[type];

type Value = Color | FontSize | Space | Radius | Shadow;

export default (property: string, value?: Value) => {
  switch (property) {
    case 'color':
      return getColor(value as Color);
    case 'size':
      return getFontSize(value as FontSize);
    case 'space':
      return getSpace(value as Space);
    case 'radius':
      return getRadius(value as Radius);
    case 'shadow':
      return getShadow(value as Shadow);
    default:
      throw Error(`Property ${property} isn't valid.`);
  }
};
