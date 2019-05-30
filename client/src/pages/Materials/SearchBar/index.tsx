import React from 'react';
import { Input } from 'antd';
import { IMaterial } from '../store/withMaterials';
import { SearchBarContainer } from './styles';

const SearchBar: React.FC<IProps> = ({ setSearched, materials }) => {
  const handleSearch = (e: any) => {
    let currentMaterials = [];
    let search = [];
    if (e.target.value !== '') {
      currentMaterials = materials;
      search = currentMaterials.filter((material: any) => {
        const lc = material.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      search = materials;
    }
    setSearched(search);
  };

  return (
    <SearchBarContainer>
      <Input placeholder="Szukaj..." onChange={e => handleSearch(e)} />
    </SearchBarContainer>
  );
};

interface IProps {
  materials: IMaterial[];
  setSearched: any;
}

export default SearchBar;
