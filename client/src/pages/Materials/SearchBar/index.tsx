import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { IMaterial } from '../store/withMaterials';
import withMaterialTags, { MaterialTag } from '../store/withMaterialTags';
import Loader from 'components/Loader';
import { SearchBarContainer, Filters, FiltersPanel } from './styles';

const { Search } = Input;
const { Option } = Select;

const renderTags = (materialTags: MaterialTag[]) => {
  if (materialTags) {
    return materialTags.map(tag => (
      <Option key={tag.id} value={tag.id}>
        {tag.name}
      </Option>
    ));
  }
  return Loader;
};

const SearchBar = (props: IProps) => {
  const [filteredValues, setFiteredValues] = useState(props.materials);
  console.log('searchbarProps: ', props.filteredMaterials);

  const handleSearch = (e: any, props: IProps) => {
    const { materials, setSearched, filteredMaterials } = props;
    console.log('handleSearch: ', filteredMaterials);
    let currentMaterials = [];
    let searchedMaterials = [];
    if (e.target.value !== '') {
      currentMaterials = filteredMaterials.length === materials.length ? materials : filteredValues;
      searchedMaterials = currentMaterials.filter((material: any) => {
        const lc = material.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      searchedMaterials = filteredMaterials.length === materials.length ? materials : filteredValues;
    }
    setSearched(searchedMaterials);
  };

  const handleFilters = (chosenTags: any) => {
    const { materials, setFiltered, setSearched } = props;
    let currentMaterials = [];
    let filteredMaterials: any = [];
    if (chosenTags && chosenTags.length !== 0) {
      currentMaterials = materials;
      filteredMaterials = currentMaterials.filter((material: IMaterial) =>
        material.tags.some((tag: MaterialTag) => chosenTags.includes(tag.id)),
      );
      setFiltered(filteredMaterials);
      setFiteredValues(filteredMaterials);
    } else {
      filteredMaterials = materials;
      setFiltered(filteredMaterials);
      // setSearched(filteredMaterials);
    }
  };
  return (
    <SearchBarContainer>
      <Input placeholder="Szukaj..." onChange={e => handleSearch(e, props)} style={{ marginRight: '10px' }} />
      <Select mode="tags" style={{ width: '25%' }} placeholder="Filtruj..." onChange={value => handleFilters(value)}>
        {renderTags(props.materialTags)}
      </Select>
    </SearchBarContainer>
  );
};

interface IProps {
  materials: IMaterial[];
  filteredMaterials: IMaterial[];
  setFiltered: any;
  setSearched: any;
  materialTags: MaterialTag[];
}

export default withMaterialTags(SearchBar);
