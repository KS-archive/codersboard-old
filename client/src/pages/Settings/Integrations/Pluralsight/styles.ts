import styled from 'styled-components';
import get from 'styles/getStyle';

export const PluralsightContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${get('space-12')} 0;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 0;
`;

export const Image = styled.div<{ src: string }>`
  width: 64px;
  height: 64px;
  margin-right: ${get('space-16')};
  border-radius: ${get('radius-4')};
  background: url('${props => props.src}') no-repeat center/cover;
`;

export const Text = styled.div`
  flex: 1 0;
`;

export const Title = styled.h3<{ integrated: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin: 0;
  font-size: ${get('font-size-16')};
  color: ${get('color-text-primary')};

  &::before {
    content: '';
    position: absolute;
    right: calc(0px - ${get('space-16')});
    width: 8px;
    height: 8px;
    background-color: ${props => (props.integrated ? get('color-success') : get('color-danger'))};
    border-radius: 100%;
  }
`;

export const Description = styled.p`
  font-size: ${get('font-size-14')};
  color: ${get('color-text-regular')};
`;

export const Buttons = styled.div`
  flex: 0 0 auto;
  padding: 0;
  font-size: 0;
  list-style: none;
  margin-left: ${get('space-48')};

  > button {
    margin: 0 ${get('space-8')};

    &:first-child {
      margin-left: 0;
    }
  }
`;
