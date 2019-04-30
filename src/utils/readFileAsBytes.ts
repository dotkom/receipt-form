/**
 * Wrap FileReader in a Promise to make a reusable async function.
 * Reads a file as an ArrayBuffer.
 * @param {Blob} file File or data Blob to read data from.
 */
export const readFileAsBytes = async (file: File | Blob) => {
  /** Create a FileReader to use */
  const tempFileReader = new FileReader();

  /** Wrap FileReader methods in a Promise */
  return new Promise<Uint8Array>((resolve, reject) => {
    /** Handle FileReader errors with a rejection */
    tempFileReader.onerror = () => {
      tempFileReader.abort();
      reject(new Error('There was an error reading a file'));
    };

    /** Handle data loading finished */
    tempFileReader.onloadend = () => {
      const { result } = tempFileReader;
      /** Output should be a string from 'readAsDataURL' */
      if (typeof result === 'string') {
        reject(new Error('Expected ArrayBuffer, got string'));
      } else {
        /** Resolve Promise with data if all goes well */
        resolve(result ? new Uint8Array(result) : undefined);
      }
    };

    /** Read the image file data as a URL string */
    tempFileReader.readAsArrayBuffer(file);
  });
};
