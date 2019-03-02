// Shamefully cooked from StackOverflow
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const KILO = 1024;

/**
 * Convert bytes to most fitting format.
 * 1023 => 1023 Bytes
 * 1024 => 1 KB
 * @param bytes number of Bytes.
 * @param decimals Amount of decimals to include.
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const i = Math.floor(Math.log(bytes) / Math.log(KILO));
  return parseFloat((bytes / Math.pow(KILO, i)).toFixed(dm)) + ' ' + SIZES[i];
};
