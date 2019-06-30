import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Transfer } from 'antd';
import Loader from 'components/Loader';
import withMaterials, { IMaterial, withAllMaterials } from '../store/withMaterials';
import updateMaterial from '../store/updateMaterial';

const formatData = (data: IMaterial[]) =>
  data.map(material => ({
    key: material.id,
    title: material.title,
    chosen: false,
  }));

const attachMaterials = (data: string[], project: string) =>
  data.forEach((key: string) => updateMaterial({ data: { project: { connect: { url: project } } }, id: key }));

const detachMaterials = (data: string[], project: string) =>
  data.forEach((key: string) => updateMaterial({ data: { project: { disconnect: { url: project } } }, id: key }));

const AddMaterialProject: React.FC<IProps> = ({
  projectMaterials,
  allMaterials,
  allMaterialsLoading,
  match: {
    params: { projectURL },
  },
  render
}) => {
  const [targetKeys, setTargetKeys] = useState(projectMaterials.map(material => material.id));

  const handleChange = (targetKeys: string[], direction: string, moveKeys: string[]) => {
    if (direction === 'right') {
      attachMaterials(moveKeys, projectURL);
    }

    if (direction === 'left') {
      detachMaterials(moveKeys, projectURL);
    }
    setTargetKeys(targetKeys);
    render(allMaterials.filter(material => targetKeys.includes(material.id)))
  };
  return (
    <>
      {allMaterialsLoading ? (
        <Loader />
      ) : (
          <Transfer
            dataSource={formatData(allMaterials)}
            showSearch
            targetKeys={targetKeys}
            onChange={handleChange}
            render={item => item.title}
          />
        )}
    </>
  );
};

interface IProps {
  allMaterials: IMaterial[];
  projectMaterials: IMaterial[];
  allMaterialsLoading: boolean;
  match: {
    params: {
      projectURL: string;
    };
  };
  render: (targetKeys: IMaterial[]) => void;
}
export default withRouter(withAllMaterials(withMaterials(AddMaterialProject)));
