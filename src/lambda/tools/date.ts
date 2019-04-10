export const getCurrentDateString = () => {
  const date = new Date();
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};
