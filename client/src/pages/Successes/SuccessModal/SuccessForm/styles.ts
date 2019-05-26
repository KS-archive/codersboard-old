import styled from 'styled-components';
import { Form } from 'formik';
import get from 'styles/getStyle';

export const SuccessFormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${get('space-12')} ${get('space-16')};
  border-top: ${get('border-light')};
  border-radius: 0 0 ${get('radius-4')} ${get('radius-4')};
  background-color: transparent;
  margin: calc(0px - ${get('space-24')});
  margin-top: ${get('space-32')};

  button + button {
    margin-left: ${get('space-8')};
  }
`;
