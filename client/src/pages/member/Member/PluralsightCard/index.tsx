import React from 'react';
import CardBase from '../CardBase';
import Pluralsight from './Pluralsight';
import { PluralsightList } from './styles';

const renderCards = (integrations: IPluralsight[]) => integrations.map(item => <Pluralsight {...item} />);

const PluralsightCard: React.FC<IProps> = ({ integrations }) => {
  return (
    <CardBase title="Pluralsight">
      <PluralsightList>{renderCards(integrations)}</PluralsightList>
    </CardBase>
  );
};

export interface IPluralsight {
  id: string;
  title: string;
  thumbnailUrl: string;
  score: number;
  percentile: number;
  level: string;
}

interface IProps {
  integrations: IPluralsight[];
}

export default PluralsightCard;
