/* eslint-disable no-sequences */
import axios from 'axios';

export const pick = (obj: any, arr: string[]): any =>
  arr.reduce((acc: any, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const uploadToCloudinary = async (file: File, presetName: string): Promise<string> => {
  const reqData = new FormData();
  reqData.append('file', file);
  reqData.append('upload_preset', presetName);

  const { data } = await axios.post('https://api.cloudinary.com/v1_1/codersboard/image/upload', reqData);
  console.log('Image uploaded to Cloudinary');

  return data.secure_url;
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
