import styled from 'styled-components';
import get from 'styles/getStyle';

export const ProjectWrapperContainer = styled.div`
  margin: calc(0px - ${get('space-32')});
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectImage = styled.img`
  height: 100%;
`;

export const ProjectName = styled.p`
  font-weight: bold;
  margin-left: ${get('space-12')};
`;

export const ProjectContent = styled.div`
  margin: ${get('space-32')};
`;
