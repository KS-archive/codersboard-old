import React from 'react';

import withIntegrations, { IWithIntegrations, IIntegration } from './store/withIntegrations';
import Codewars from './Codewars';
import Pluralsight from './Pluralsight';
import { List } from './styles';

const Integrations: React.FC<IProps> = ({ integrations, integrationsLoading }) => {
  const codewars: IIntegration | {} = integrations.find(({ key }) => key === 'codewars') || {};
  const pluralsight: IIntegration | {} = integrations.find(({ key }) => key === 'pluralsight') || {};

  return (
    <List>
      <Codewars data={(codewars as IIntegration).data} loading={integrationsLoading} />
      <Pluralsight data={(pluralsight as IIntegration).data} loading={integrationsLoading} />
    </List>
  );
};

interface IProps extends IWithIntegrations {}

export default withIntegrations(Integrations);
