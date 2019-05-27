import React, { useState } from 'react';
import { Icon, Input, Select } from 'antd';
import withMaterialTags from '../store/withMaterialTags';
import Loader from 'components/Loader';
import { SearchBarContainer, Filters, FiltersPanel } from './styles';

const { Search } = Input;
const { Option } = Select;

const renderTags = (materialTags: any[]) => {
  if (materialTags) {
    return materialTags.map(tag => (
      <Option key={tag.id} value={tag.id}>
        {tag.name}
      </Option>
    ));
  }
  return Loader;
};

const handleFilters = (chosenTags: any, materials: any[]) => {
  console.log(materials);
  let currentMaterials = [];
  let filteredMaterials: any = [];
  if (chosenTags) {
    currentMaterials = materials;
    console.log(currentMaterials);
    filteredMaterials = currentMaterials.filter(material =>
      material.tags.some((tag: any) => chosenTags.includes(tag.id)),
    );
    console.log(filteredMaterials);
  } else filteredMaterials = materials;
};

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
        <Select
          mode="tags"
          style={{ width: '25%' }}
          placeholder="Filtruj..."
          onChange={value => handleFilters(value, props.materials)}
        >
          {renderTags(props.materialTags)}
        </Select>
      </FiltersPanel>
    </SearchBarContainer>
  );
};

interface IProps {
  search: any;
  filter: any;
  materials: any;
  materialTags: any[];
}

export default withMaterialTags(SearchBar);
