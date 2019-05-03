import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;

      danger: string;
      warning: string;
      success: string;
      info: string;

      primaryText: string;
      regularText: string;
      secondaryText: string;
      placeholderText: string;

      background: string;

      black: string;
      darkGrey: string;
      grey: string;
      lightGrey: string;
      white: string;
    };
    size: {
      xxl: number;
      xl: number;
      lg: number;
      md: number;
      sm: number;
      xs: number;
    };
    space: {
      xxl: number;
      xl: number;
      lg: number;
      md: number;
      sm: number;
      xs: number;
      xxs: number;
    };
    radius: {
      normal: number;
      large: number;
    };
    shadow: {
      small: string;
    };
  }
}

export type Color =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'primaryText'
  | 'regularText'
  | 'secondaryText'
  | 'placeholderText'
  | 'background'
  | 'black'
  | 'darkGrey'
  | 'grey'
  | 'lightGrey'
  | 'white';

export type FontSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type Space = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
export type Radius = 'normal' | 'large';
export type Shadow = 'small';
