import React from 'react';

import { IMember } from '../store/withMember';
import { MainCardContainer, Image, FullName, Role, DataRow } from './styles';

const MainCard: React.FC<IProps> = member => {
  return (
    <MainCardContainer>
      <Image src={member.image} />
      <FullName>{member.fullName}</FullName>
      <Role>{member.role}</Role>
      <DataRow>
        <strong>E-mail:</strong>
        <p>{member.email}</p>
      </DataRow>
      {member.phone && (
        <DataRow>
          <strong>Telefon:</strong>
          <p>{member.phone}</p>
        </DataRow>
      )}
      {member.university && (
        <DataRow>
          <strong>Uczelnia:</strong>
          <p>{member.university.name}</p>
        </DataRow>
      )}
      {member.universityDepartment && (
        <DataRow>
          <strong>Wydział:</strong>
          <p>{member.universityDepartment}</p>
        </DataRow>
      )}
      {member.fieldOfStudy && (
        <DataRow>
          <strong>Kierunek:</strong>
          <p>{member.fieldOfStudy}</p>
        </DataRow>
      )}
    </MainCardContainer>
  );
};

interface IProps extends IMember {}

export default MainCard;
