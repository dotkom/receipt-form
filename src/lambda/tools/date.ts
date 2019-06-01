export const getCurrentDateString = () => {
  const date = new Date(Date.now());
  const [dateString] = date.toISOString().split('T');
  return `${dateString}`;
};
