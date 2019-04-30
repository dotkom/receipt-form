import { saveAs } from 'file-saver';

/**
 * @summary Download an in-memory file to client.
 */
export const downloadFile = async (file: File) => {
  saveAs(file, file.name);
};
