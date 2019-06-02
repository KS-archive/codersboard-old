import { IUser } from "../store/withUsers";
import { RowNode } from "ag-grid-community";


const calculateRowHeight = ({ data }: IParams) => {
  let height = 48;

  if (data.areas.length) {
    height = Math.max(8 + 32 * Math.ceil(data.areas.length / 2), height);
  }

  if (data.projects.length) {
    height = Math.max(8 + 32 * Math.ceil(data.projects.length / 4), height);
  }

  return height;
};

interface IParams extends RowNode {
  data: IUser;
}

export default calculateRowHeight;
