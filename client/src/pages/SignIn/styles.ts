import styled from 'styled-components';
import { Form as FormikForm } from 'formik';
import get from 'styles/getStyle';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${get('color-background')};
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 320px;
  min-height: 300px;
  padding: ${get('space-24')};
  padding-top: 48px;
  border-radius: ${get('radius-4')};
  box-shadow: ${get('shadow-small')};
  background-color: ${get('color-grayscale-white')};
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 80px;
  padding: ${get('space-16')};
  border-radius: ${get('radius-4')};
  background-color: ${get('color-grayscale-black')};

  svg {
    width: 100%;
  }
`;

export const Form = styled(FormikForm)`
  width: 100%;
`;
