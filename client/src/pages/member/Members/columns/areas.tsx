import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import get from 'styles/getStyle';
import { IColumn } from '..';

const AreasRendererCell = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 42.6px);
  grid-template-rows: repeat(auto-fill, 24px);
  grid-gap: ${get('space-8')};
  width: 100%;
  padding: ${get('space-8')};
`;

const Area = styled.img`
  width: 42.6px;
  height: 24px;
  border-radius: ${get('radius-4')};
`;

const AreasRenderer: React.FC<IColumn<IArea[]>> = ({ value }) => {
  return (
    <AreasRendererCell>
      {value.map(({ area: { id, name, image } }) => {
        return (
          <Tooltip key={id} title={name}>
            <Area src={image} />
          </Tooltip>
        );
      })}
    </AreasRendererCell>
  );
};

interface IArea {
  id: string;
  area: {
    id: string;
    name: string;
    image: string;
    __typename: 'Area';
  };
  __typename: 'AreaMember';
}

export default { field: 'areas', headerName: 'Obszary', cellRendererFramework: AreasRenderer, width: 156 };
