import React, { useState } from 'react';
import { List } from 'antd';
import CodeWarsIntegrate from './modals/CodewarsIntegrate';
import CodeWarsDetails from './modals/CodewarsDetails';
import ListItem, { IntegrationItem } from './ListItem';
import integrationsList from './integrationsList';
import withIntegrations, { IWithIntegrations } from './store/withIntegrations';

const Integrations: React.FC<IProps> = ({ integrations }) => {
  const [modal, setModal] = useState(null);
  const handleClose = () => setModal(null);

  return (
    <>
      <List<IntegrationItem>
        itemLayout="horizontal"
        dataSource={integrationsList}
        renderItem={item => <ListItem item={item} setModal={setModal} integrated={!!integrations[item.key]} />}
      />
      {!integrations.loading && (
        <>
          {!integrations.codewars && (
            <CodeWarsIntegrate visible={modal === 'codewars-integrate'} handleClose={handleClose} />
          )}
          {integrations.codewars && (
            <CodeWarsDetails
              visible={modal === 'codewars-details'}
              handleClose={handleClose}
              codewars={integrations.codewars.data}
            />
          )}
        </>
      )}
    </>
  );
};

interface IProps extends IWithIntegrations {}

export default withIntegrations(Integrations);
