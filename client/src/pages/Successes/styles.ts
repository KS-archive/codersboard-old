import styled from 'styled-components';
import { Button, Timeline as AntdTimeline } from 'antd';
import get from 'styles/getStyle';

export const SuccessesContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${get('space-24')};
`;

export const AddButton = styled(Button)`
  margin-left: auto;
`;

export const Timeline = styled(AntdTimeline)`
  margin: ${get('space-48')} ${get('space-32')} 0;

  .ant-timeline-item-head-custom {
    background-color: unset;
  }

  .ant-timeline-item-content {
    margin-left: ${get('space-48')};
  }
`;
