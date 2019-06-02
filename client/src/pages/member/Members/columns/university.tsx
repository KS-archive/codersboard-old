import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { IColumn } from '..';

const UniversityRendererCell = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.div<{ src: string }>`
  min-width: 160px;
  min-height: 32px;
  background: url('${props => props.src}') no-repeat left/contain;
`;

const UniversityRenderer: React.FC<IColumn<IUniversity>> = ({ value }) => {
  return (
    <UniversityRendererCell>
      {value && (
        <Tooltip placement="topLeft" title={value.name}>
          <Image src={value.image} />
        </Tooltip>
      )}
    </UniversityRendererCell>
  );
};

interface IUniversity {
  id: string;
  name: string;
  image: string;
  __typename: string;
}

export default { field: 'university', headerName: 'Uczelnia', width: 184, cellRendererFramework: UniversityRenderer };
