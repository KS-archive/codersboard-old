import { Style } from 'types';

export default (varName: Style): string => `var(--${varName})`;
