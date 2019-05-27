import React, { useState } from 'react';
import { Icon, Input, Select } from 'antd';
import { IMaterial } from '../store/withMaterials';
import { SearchBarContainer, Filters, FiltersPanel } from './styles';

const { Search } = Input;
const { Option } = Select;

const SearchBar = (props: IProps) => {
  const [filters, openFilters] = useState(false);

  return (
    <SearchBarContainer>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Search placeholder="Szukaj..." onSearch={value => console.log(value)} onChange={props.search} enterButton />
        <Filters onClick={() => openFilters(!filters)}>
          Filtry
          <Icon type={filters ? 'up' : 'down'} />
        </Filters>
      </div>
      <FiltersPanel open={filters}>
        <Select mode="tags" style={{ width: '25%' }} placeholder="Filtruj...">
          <Option key="1">Filtry</Option>
        </Select>
      </FiltersPanel>
    </SearchBarContainer>
  );
};

interface IProps {
  search: any;
}

export default SearchBar;
