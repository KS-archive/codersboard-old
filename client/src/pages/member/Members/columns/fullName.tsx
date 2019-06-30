import React from 'react';
import styled from 'styled-components';
import get from 'styles/getStyle';
import { IColumn } from '..';

const MemberLink = styled.a`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  min-width: 32px;
  min-height: 32px;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: ${get('color-grayscale-light')};
`;

const FullName = styled.h4`
  margin: 0;
  margin-left: ${get('space-12')};
  font-size: ${get('font-size-14')};
`;

const FullNameRenderer: React.FC<IColumn> = ({ data, value }) => {
  return (
    <MemberLink href={`/members/${data.profileURL}`}>
      <Image style={{ backgroundImage: `url('${data.image}')` }} />
      <FullName>{value}</FullName>
    </MemberLink>
  );
};

export default {
  field: 'fullName',
  headerName: 'Imię i nazwisko',
  cellRendererFramework: FullNameRenderer,
  width: 224,
};
