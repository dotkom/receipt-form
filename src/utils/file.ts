import { areListsEqual } from './equality';

export const isFileEqual = (file1: File, file2: File) => {
  return file1.name === file2.name && file1.size === file2.size;
};

export const areFilesEqual = areListsEqual(isFileEqual);
