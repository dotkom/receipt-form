import { LAMBDA_PRESIGN_UPLOAD_ENDPOINT } from "constants/backend";

export const uploadFile = async (file: File): Promise<string> => {
  if (!LAMBDA_PRESIGN_UPLOAD_ENDPOINT) {
    throw new Error('LAMBDA_PRESIGN_UPLOAD_ENDPOINT is not set');
  }

  // Request to get the presigned POST data
  const response = await fetch(LAMBDA_PRESIGN_UPLOAD_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  });

  const body = await response.json();
  if (!response.ok) {
    console.error(await response.text());
    throw new Error('Failed to get presigned post data');
  }

  const { url, fields }: {url: string, fields: {[key: string]: string}} = JSON.parse(body.data);

  const formData = new FormData();
  for (const key in fields) {
    formData.append(key, fields[key]);
  }
  formData.append('file', file);

  const uploadResponse = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload file');
  }

  return fields.key
};
