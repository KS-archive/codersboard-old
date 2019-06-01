import React from 'react';
import styled from 'styled-components';
import { IFormatter } from '.';

const UniversityFormatterCell = styled.div`
  border: none;
`;

const UniversityFormatter: React.FC<IFormatter<IUniversity>> = ({ value }) => {
  return (
    <UniversityFormatterCell>
      {value ? value.name : ''}
    </UniversityFormatterCell>
  );
};

interface IUniversity {
  id: string;
  name: string;
  image: string;
  __typename: string;
}

export default UniversityFormatter;
