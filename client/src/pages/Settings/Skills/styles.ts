import styled from 'styled-components';
import get from 'styles/getStyle';
import { Rate } from 'antd';

export const SkillsWrapper = styled.div`
  display: grid;
  grid-gap: ${get('space-24')};
  grid-template-columns: repeat(2, 1fr);
  padding: ${get('space-24')} 0;
`;

export const SkillCard = styled.div`
  display: flex;
  align-items: center;
  padding: ${get('space-12')};
  border: 1px solid ${get('color-grayscale-light')};
  border-radius: ${get('radius-4')};
`;

export const SkillName = styled.div`
  margin-right: ${get('space-12')};
  font-size: ${get('font-size-14')};
  font-weight: 600;
`;

export const RatingDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${get('color-primary')};
`;

export const Rating = styled(Rate)<{ onBlur: () => void }>`
  margin-left: auto;

  .ant-rate-star-first {
    display: none;
  }

  .ant-rate-star-zero {
    ${RatingDot} {
      background-color: ${get('color-grayscale-light')};
    }
  }

  .ant-rate-star-full {
    ${RatingDot} {
      background-color: ${get('color-primary')};
    }
  }
`;
