import { createGlobalStyle } from 'styled-components';
import get from 'styles/getStyle';
import cssReset from './cssReset';
import antdOverwrite from './antdOverwrite';

export default createGlobalStyle`
  ${cssReset}

  body {
    color: ${get('color')('regularText')};
  }

  #root {
    ${antdOverwrite}
  }
`;
