import styled from 'styled-components';
import { Timeline } from 'antd';
import get from 'styles/getStyle';

export const SuccessContainer = styled(Timeline.Item)`
  margin-bottom: ${get('space-24')};
`;

export const Content = styled.div`
  padding: ${get('space-16')};
  border: ${get('border-light')};
  background-color: ${get('color-grayscale-white')};
  border-radius: ${get('radius-4')};
`;

export const DotContainer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: ${props => props.color};
`;

export const Name = styled.h3`
  margin: 0;
  font-size: ${get('font-size-16')};
`;

export const DateString = styled.p`
  font-size: ${get('font-size-12')};
`;

export const Description = styled.p`
  margin-top: ${get('space-8')};
`;

export const Users = styled.div`
  margin-top: ${get('space-12')};

  .ant-avatar {
    margin-right: ${get('space-8')};
  }
`;

export const Project = styled.div`
  margin-top: ${get('space-12')};

  div {
    display: flex;
    align-items: center;
  }

  img {
    height: 32px;
    margin-right: ${get('space-12')};
    border-radius: ${get('radius-4')};
  }
`;
