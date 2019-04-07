import { readFileAsDataUrl } from './readFileAsDataUrl';

/**
 * @summary Download an in-memory file to client.
 * @description Download a file by creating a temporary link element with the data as the URL.
 */
export const downloadFile = async (file: File) => {
  /** Ge the file in a URL format */
  const dataUrl = await readFileAsDataUrl(file);

  /** Create a hidden HTML link */
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';

  /** Set file attributes to the link */
  tempLink.href = dataUrl;
  tempLink.download = file.name;

  /** Attacht the link to the DOM, click it, and remove it */
  const DOMLink = document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(DOMLink);
};
