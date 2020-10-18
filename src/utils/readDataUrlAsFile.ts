export const generateRandomFileName = () => {
  return Math.random().toString(36).substring(2);
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

export const dataUrlToArrayBuffer = (dataUrl: string, sliceSize = 512) => {
  const byteCharacters = new Buffer(dataUrl, 'base64').toString('binary');
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return byteArrays;
};

export const readDataUrlAsFile2 = async (dataUrl: string, fileName?: string) => {
  try {
    const type = getDataUrlMimeType(dataUrl);
    if (type) {
      const dataStart = dataUrl.indexOf(',');
      const dataUrlContent = dataUrl.slice(dataStart);
      const buffer = dataUrlToArrayBuffer(dataUrlContent);
      const file = new File(buffer, fileName || generateRandomFileName(), { type });
      return file;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
