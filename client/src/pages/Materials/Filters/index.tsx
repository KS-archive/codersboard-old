import React from 'react';
import { Select } from 'antd';
import { IMaterial } from '../store/withMaterials';
import withMaterialTags, { MaterialTag } from '../store/withMaterialTags';
import withAreas, { IArea } from 'pages/area/Areas/store/withAreas';
import Loader from 'components/Loader';
import { SelectTags } from './styles';

const { Option } = Select;

const Filters: React.FC<IProps> = ({ materials, setFiltered, materialTags, url, areas }) => {
  const renderTags = () => {
    if (materialTags && areas) {
      const areasArr: string[] = [];
      areas.forEach((area: IArea) => areasArr.push(area.name));
      console.log(url);
      if (url === '/materials') {
        return materialTags.map(tag => (
          <Option key={tag.id} value={tag.id}>
            {tag.name}
          </Option>
        ));
      } else {
        const materialTypes = materialTags.filter(tag => !areasArr.includes(tag.name));
        return materialTypes.map(tag => (
          <Option key={tag.id} value={tag.id}>
            {tag.name}
          </Option>
        ));
      }
    }
    return Loader;
  };
  const handleFilters = (chosenTags: any) => {
    let currentMaterials = [];
    let filteredMaterials: any = [];
    if (chosenTags && chosenTags.length !== 0) {
      currentMaterials = materials;
      filteredMaterials = currentMaterials.filter((material: IMaterial) =>
        material.tags.some((tag: MaterialTag) => chosenTags.includes(tag.id)),
      );
      setFiltered(filteredMaterials);
    } else {
      filteredMaterials = materials;
      setFiltered(filteredMaterials);
    }
  };

  return (
    <SelectTags mode="tags" placeholder="Filtruj..." onChange={value => handleFilters(value)}>
      {renderTags()}
    </SelectTags>
  );
};

interface IProps {
  materials: IMaterial[];
  setFiltered: any;
  materialTags: MaterialTag[];
  url: string;
  areas: any;
}

export default withAreas(withMaterialTags(Filters));
