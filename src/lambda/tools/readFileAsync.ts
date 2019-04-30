import fs from 'fs';

export const readFileAsync = async (path: Parameters<typeof fs.readFile>[0]) => {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};
