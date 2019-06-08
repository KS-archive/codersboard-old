/* eslint-disable no-sequences */
import axios from 'axios';
import ApolloClient from 'apollo-boost';

export const apollo = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_ROOT_URL,
  credentials: 'include',
});

export const pick = (obj: any, arr: string[]): any =>
  arr.reduce((acc: any, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const uploadToCloudinary = async (file: File, folder: string): Promise<string> => {
  const reqData = new FormData();
  reqData.append('file', file);
  reqData.append('folder', process.env.REACT_APP_CLOUDINARY_FOLDER_NAME + folder);

  const { data } = await axios.post(`${process.env.REACT_APP_SERVER_ROOT_URL}/cloudinary`, reqData, {
    withCredentials: true,
  });

  return data.secure_url;
};

export const omit = (obj: any, arr: string[]): any =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc: any, key) => ((acc[key] = obj[key]), acc), {});

export const shorten = (str: string, maxLen: number) =>
  str.length > maxLen ? `${str.substring(0, maxLen - 3)}...` : str;

export const formatCamelCase = (text: string) => {
  let formatedText = text.replace(/([A-Z])/g, ' $1');
  formatedText = formatedText.toLocaleLowerCase();
  formatedText = formatedText.charAt(0).toUpperCase() + formatedText.slice(1);
  return formatedText;
};
