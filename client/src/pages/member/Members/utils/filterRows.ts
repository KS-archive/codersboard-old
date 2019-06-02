import { IUser } from "../store/withUsers";
import { RowNode } from "ag-grid-community";

const filterRows = (node: IParams, filter: string) => {
  return (
    node.data.fullName.toLowerCase().includes(filter) ||
    node.data.role.toLowerCase().includes(filter) ||
    node.data.projects.some(project => project.project.name.toLowerCase().includes(filter)) ||
    node.data.areas.some(area => area.area.name.toLowerCase().includes(filter))
  );
};

interface IParams extends RowNode {
  data: IUser;
}

export default filterRows;
