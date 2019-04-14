export const positionText = (x: number, y: number) => ({
  x,
  y,
  size: 14,
  font: 'TimesRoman',
  colorRgb: [0, 0, 0],
});

const MAX_CHAR_LENGTH = 65;

/**
 * Converts a single line string to array of strings of maxCharLength
 */
export const createMultiLine = (str: string) => {
  const multiLine = [str];

  while (multiLine[multiLine.length - 1].length > MAX_CHAR_LENGTH) {
    const lastString = multiLine[multiLine.length - 1];
    const endOfLastWord = lastString.slice(0, MAX_CHAR_LENGTH).lastIndexOf(' ');
    multiLine[multiLine.length - 1] = lastString.slice(0, endOfLastWord);
    multiLine.push(lastString.slice(endOfLastWord + 1));
  }

  return multiLine;
};
