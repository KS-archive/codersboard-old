import React from 'react';
import { Icon } from 'components';
import { ReactComponent as Trophy } from 'static/fa/regular/trophy-alt.svg';
import { ReactComponent as Medal } from 'static/fa/regular/medal.svg';
import { ReactComponent as Newspaper } from 'static/fa/regular/newspaper.svg';

import { SuccessType } from '../../store/withSuccesses';
import { DotContainer } from './styles';

const dotConfigs = {
  EPIC: {
    color: '#faad14',
    icon: Trophy,
  },
  SMALL: {
    color: '#1890ff',
    icon: Medal,
  },
  NEWS: {
    color: '#13c2c2',
    icon: Newspaper,
  },
};

const Dot: React.FC<{ type: SuccessType }> = ({ type }) => {
  const { color, icon } = dotConfigs[type];

  return (
    <DotContainer color={color}>
      <Icon color="#fff" icon={icon} />
    </DotContainer>
  );
};

export default Dot;
