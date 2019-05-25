import Compressor from 'compressorjs';
import { Dimensions } from '.';

export const compressFile = (file: File, { width, height }: Dimensions) =>
  new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      width,
      height,
      success: async blob => {
        file = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        resolve(file);
      },
      error: err => reject(err.message),
    });
  });
