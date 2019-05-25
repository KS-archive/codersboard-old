/* eslint-disable no-sequences */
import axios from 'axios';

export const pick = (obj: any, arr: string[]): any =>
  arr.reduce((acc: any, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const uploadToCloudinary = async (file: File, folder: string): Promise<string> => {
  const reqData = new FormData();
  reqData.append('file', file);
  reqData.append('folder', folder);

  const { data } = await axios.post('http://localhost:5000/cloudinary', reqData, { withCredentials: true });
  console.log('Image uploaded to Cloudinary');

  return data.secure_url;
};

export const omit = (obj: any, arr: string[]): any =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc: any, key) => ((acc[key] = obj[key]), acc), {});
