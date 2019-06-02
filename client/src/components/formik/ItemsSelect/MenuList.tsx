import React from 'react';
import { List, ListRowProps } from 'react-virtualized';
import { IItemsSelectOption } from '.';
import { Props } from 'react-select/lib/Select';

const MenuList: React.FC<Props<IItemsSelectOption>> = (props) => {
  const rows: any = props.children;
  const rowRenderer = ({ key, index, style }: ListRowProps) => (
    <div key={key} style={style}>
      {rows[index]}
    </div>
  );

  return (
    <List
      style={{ width: '100%' }}
      width={600}
      height={300}
      rowHeight={40}
      rowCount={rows.length || 0}
      rowRenderer={rowRenderer}
    />
  );
};

export default MenuList;
