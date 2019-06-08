import React from 'react';
import { List } from 'antd';
import { formatCamelCase } from 'utils';
import CardBase from '../CardBase';
import Codewars from './Codewars';
import { CodewarsList } from './styles';

const toArray = (object: any) => {
  let newArr = [];
  for (let key in object) {
    if (key !== 'languages') {
      newArr.push({ value: `${object[key]}`, label: formatCamelCase(`${key}`) });
    }
  }
  return newArr;
};

const renderItems = (items: any[]) => items.map(item => <Codewars label={item.label} value={item.value} />);

const CodewarsCard: React.FC<IProps> = ({ integrations }) => {
  return (
    <CardBase title="Codewars">
      <CodewarsList>{renderItems(toArray(integrations))}</CodewarsList>
    </CardBase>
  );
};

interface IProps {
  integrations: {
    kyu: number;
    honor: number;
    leadersboardposition: number;
    score: number;
    completedChallenges: number;
    name: string;
  };
}

export default CodewarsCard;
