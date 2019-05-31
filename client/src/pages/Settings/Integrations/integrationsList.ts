import { message } from 'antd';
import detachCodewars from './store/detachCodewars';
import { IntegrationItem } from './ListItem';

const integrationsList: IntegrationItem[] = [
  {
    key: 'codewars',
    name: 'Codewars',
    icon: '/codewars_logo.png',
    description: 'Portal z wyzwaniami dla programistów.',
    detachFunction: async () => {
      await detachCodewars();
      message.success('Portal Codewars został odłączony');
    },
  },
];

export default integrationsList;
