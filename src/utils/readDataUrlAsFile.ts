export const generateRandomFileName = () => {
  return Math.random()
    .toString(36)
    .substring(2);
};

export const getDataUrlMimeType = (dataUrl: string) => {
  const [info] = dataUrl.split(',');
  const matches = info.match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/);
  const type = matches ? matches[0] : null;
  if (!type) {
    throw new Error('Expected File as a dataUrl, could not extract mime-type information');
  }
  return type;
};

export const readDataUrlAsFile = async (dataUrl: string, fileName?: string) => {
  try {
    const type = getDataUrlMimeType(dataUrl);
    const res = await fetch(dataUrl);
    const buffer = await res.arrayBuffer();
    const file = new File([buffer], fileName || generateRandomFileName(), { type });
    return file;
  } catch (error) {
    throw error;
  }
};
