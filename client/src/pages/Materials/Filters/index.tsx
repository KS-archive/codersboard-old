import React from 'react';
import { Select } from 'antd';
import { IMaterial } from '../store/withMaterials';
import withMaterialTags, { MaterialTag } from '../store/withMaterialTags';
import withAreas, { IArea } from 'pages/area/Areas/store/withAreas';
import Loader from 'components/Loader';
import { SelectTags } from './styles';

const { Option } = Select;

const renderTags = (materialTags: MaterialTag[], areas: IArea[], url: string) => {
  if (materialTags && areas) {
    const areasArr: string[] = [];
    areas.forEach((area) => areasArr.push(area.name));
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

const handleFilters = (chosenTags: any, setFiltered: (filteredMaterials: IMaterial[]) => void, materials: IMaterial[]) => {
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

const Filters: React.FC<IProps> = ({ materials, setFiltered, materialTags, url, areas }) => {

  return (
    <SelectTags mode="tags" placeholder="Filtruj..." onChange={value => handleFilters(value, setFiltered, materials)}>
      {renderTags(materialTags, areas, url)}
    </SelectTags>
  );
};


interface IProps {
  materials: IMaterial[];
  setFiltered: (filteredMaterials: IMaterial[]) => void;
  materialTags: MaterialTag[];
  url: string;
  areas: IArea[];
}

export default withAreas(withMaterialTags(Filters));
