import React from 'react';

import withIntegrations, { IWithIntegrations, IIntegration } from './store/withIntegrations';
import Codewars from './Codewars';
import { List } from './styles';

const Integrations: React.FC<IProps> = ({ integrations, integrationsLoading }) => {
  const codeWars: IIntegration | {} = integrations.find(({ key }) => key === 'codewars') || {};

  return (
    <List>
      <Codewars data={(codeWars as IIntegration).data} />
    </List>
  );
};

interface IProps extends IWithIntegrations {}

export default withIntegrations(Integrations);
