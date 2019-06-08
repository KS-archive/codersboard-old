import React from 'react';
import { Spin } from 'antd';
import { withRouter } from 'react-router-dom';

import withMember, { IWithMember } from './store/withMember';
import MainCard from './MainCard';
import SkillsCard from './SkillsCard';
import ProjectsCard from './ProjectsCard';
import AreasCard from './AreasCard';
import CodewarsCard from './CodewarsCard';
import PluralsightCard from './PluralsightCard';
import { Columns, Column } from './styles';

const checkIntegrations = (integrations: any[]) => {
  if (!integrations) {
    return;
  }
  if (integrations.length === 2) {
    return (
      <>
        <PluralsightCard integrations={integrations[0].data} /> <CodewarsCard integrations={integrations[1].data} />
      </>
    );
  }
  if (integrations.length === 1) {
    return integrations[0].key === 'codewars' ? (
      <CodewarsCard integrations={integrations[0].data} />
    ) : (
      <PluralsightCard integrations={integrations[0].data} />
    );
  }
};

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
              {checkIntegrations(member.integrations)}
            </Column>
          </>
        )}
      </Columns>
    </Spin>
  );
};

interface IProps extends IWithMember {}

export default withRouter(withMember(Member));
