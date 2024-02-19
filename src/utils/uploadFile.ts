import { LAMBDA_PRESIGN_UPLOAD_ENDPOINT } from "constants/backend";
import { SuccessBody } from 'lambda/handler';

export const uploadFile = async (file: File): Promise<string> => {
  if (!LAMBDA_PRESIGN_UPLOAD_ENDPOINT) {
    throw new Error('LAMBDA_PRESIGN_UPLOAD_ENDPOINT is not set');
  }
    const response = await fetch(LAMBDA_PRESIGN_UPLOAD_ENDPOINT, {
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error('Failed to get presigned URL');
    }

    const { data } = body as SuccessBody;

    if (!data) {
      throw new Error('Failed to get presigned URL');
    }

    const { url, key } = JSON.parse(data);

    const uploadResponse = await fetch(url, {
      body: file,
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file');
    }

    return key;
};
