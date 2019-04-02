export const getEntries = <T>(obj: T): Array<[keyof typeof obj, typeof obj[keyof typeof obj]]> => {
  return Object.entries(obj) as Array<[keyof typeof obj, typeof obj[keyof typeof obj]]>;
};
