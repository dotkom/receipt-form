/**
 * Wrap FileReader in a Promise to make a reusable async function.
 * Reads a file as a URL coded data string.
 * @param {Blob} file File or data Blob to read data from.
 */
export const readFileAsDataUrl = async (file: File | Blob) => {
  /** Create a FileReader to use */
  const tempFileReader = new FileReader();

  /** Wrap FileReader methods in a Promise */
  return new Promise<string>((resolve, reject) => {
    /** Handle FileReader errors with a rejection */
    tempFileReader.onerror = () => {
      tempFileReader.abort();
      reject(new Error('There was an error reading a file'));
    };

    /** Handle data loading finished */
    tempFileReader.onloadend = () => {
      const { result } = tempFileReader;
      /** Output should be a string from 'readAsDataURL' */
      if (result instanceof ArrayBuffer) {
        reject(new Error('Expected DataURL as string from Blob/File, got ArrayBuffer'));
      } else {
        /** Resolve Promise with data if all goes well */
        resolve(result || undefined);
      }
    };

    /** Read the image file data as a URL string */
    tempFileReader.readAsDataURL(file);
  });
};
