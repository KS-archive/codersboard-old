import React from 'react';
import { Spin } from 'antd';
import { withRouter } from 'react-router-dom';

import withMember, { IWithMember } from './store/withMember';
import MainCard from './MainCard';
import SkillsCard from './SkillsCard';
import ProjectsCard from './ProjectsCard';
import AreasCard from './AreasCard';
import { Columns, Column } from './styles';

const Member: React.FC<IProps> = ({ member, memberLoading }) => {
  return (
    <Spin spinning={memberLoading} tip="Wczytywanie profilu...">
      <Columns>
        {!memberLoading && (
          <>
            <Column>
              <MainCard {...member} />
            </Column>
            <Column>
              <SkillsCard skills={member.skills} />
              <ProjectsCard projects={member.projects} />
              <AreasCard areas={member.areas} />
            </Column>
          </>
        )}
      </Columns>
    </Spin>
  );
};

interface IProps extends IWithMember {}

export default withRouter(withMember(Member));
