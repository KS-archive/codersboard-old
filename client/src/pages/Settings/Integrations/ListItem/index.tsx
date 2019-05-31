import React, { Dispatch } from 'react';
import { List, Avatar, Button } from 'antd';
import { Title } from './styles';

const { Item } = List;
const { Meta } = Item;

const renderTitle = (name: string, integrated: boolean) => (
  <Title integrated={integrated}>
    <p>{name}</p>
    <div />
  </Title>
);

const getIntegrationButton = (integrated: boolean, item: IntegrationItem, setModal: Dispatch<string>) => {
  const buttons = [];

  if (integrated) {
    buttons.push(
      <Button key="details" onClick={() => setModal(`${item.key}-details`)}>
        Szczegóły
      </Button>,
    );
    buttons.push(
      <Button key="detach" type="danger" onClick={item.detachFunction}>
        Odłącz
      </Button>,
    );
  } else {
    buttons.push(
      <Button key="integrate" onClick={() => setModal(`${item.key}-integrate`)}>
        Zintegruj
      </Button>,
    );
  }

  return buttons;
};

const ListItem: React.FC<IProps> = ({ item, integrated, setModal }) => {
  const buttons = getIntegrationButton(integrated, item, setModal);

  return (
    <Item actions={buttons}>
      <Meta
        avatar={<Avatar shape="square" size={64} src={item.icon} />}
        title={renderTitle(item.name, integrated)}
        description={item.description}
      />
    </Item>
  );
};

export interface IntegrationItem {
  key: string;
  name: string;
  icon: string;
  description: string;
  detachFunction: () => void;
}

interface IProps {
  item: IntegrationItem;
  integrated: boolean;
  setModal: Dispatch<string>;
}

export default ListItem;
