import React from 'react';
import { Input } from 'antd';
import { IMaterial } from '../store/withMaterials';
import { SearchBarContainer } from './styles';

const search = (e: any, materials: IMaterial[]) => {
let currentMaterials = [];
    let search = [];
    if (e.target.value !== '') {
      currentMaterials = materials;
      search = currentMaterials.filter((material) => {
        const lowerCase = material.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lowerCase.includes(filter);
      });
    } else {
      search = materials;
    }
    return search;
}

const SearchBar: React.FC<IProps> = ({ setSearched, materials }) => {
  const handleSearch = (e: any) => {
    const searchResult = search(e, materials);
    setSearched(searchResult);
  };

  return (
    <SearchBarContainer>
      <Input placeholder="Szukaj..." onChange={handleSearch} />
    </SearchBarContainer>
  );
};

interface IProps {
  materials: IMaterial[];
  setSearched: any;
}

export default SearchBar;
