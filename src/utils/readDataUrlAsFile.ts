export const generateRandomFileName = () => {
  return Math.random()
    .toString(36)
    .substring(2);
};

export const getDataUrlMimeType = (dataUrl: string): string | null => {
  const [info] = dataUrl.split(',');
  const matches = info.match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/);
  const type = matches ? matches[0] : null;
  return type;
};

export const readDataUrlAsFile = async (dataUrl: string, fileName?: string) => {
  try {
    const type = getDataUrlMimeType(dataUrl);
    if (type) {
      const res = await fetch(dataUrl);
      const buffer = await res.arrayBuffer();
      const file = new File([buffer], fileName || generateRandomFileName(), { type });
      return file;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
