import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

export const Filters = styled.div`
  width: 5%;
  padding: 0 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    padding: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const FiltersPanel = styled.div<FiltersPanelProps>`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  transition: all 0.3s ease;
  padding: ${props => (props.open ? '10px' : '0')};
  opacity: ${props => (props.open ? '1' : '0')};
  min-height: ${props => (props.open ? '25px' : '0')};
  background-color: rgba(0, 0, 0, 0.2);
`;

interface FiltersPanelProps {
  open: boolean;
}
