import 'isomorphic-fetch';
import './polyfills';

import { IDeserializedState, serializeReceipt } from 'form/state';
import { getIsValid } from 'form/validation';

import { NonNullableState } from './generatePDF';

import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';
import { sendEmail } from './sendEmail';
import { ApiBodyError, ApiValidationError } from './errors';
import { pdfGenerator } from './browserlessGenerator';
import { uploadFileToS3Bucket } from "../utils/uploadFileToS3Bucket";

export interface SuccessBody {
  message: string;
  data?: string;
}

interface ResponseResult extends SuccessBody {
  statusCode: number;
}

export const EMAIL_SUCCESS_MESSAGE: ResponseResult = {
  statusCode: 201,
  message: 'E-post har blitt sendt til Bankom, med deg på kopi. Takk for at du bruker digitalt kvitteringsskjema!',
};

export const TEAPOT_SUCCESS: ResponseResult = {
  statusCode: 418, // I'm a teapot
  message: '🍵 Jeg er en tekanne 🍵',
};

export const DOWNLOAD_SUCCESS_MESSAGE = (data: string): ResponseResult => ({
  statusCode: 201,
  message: 'Kvitteringsskjema ble generert som PDF, og lastes nå ned til din enhet!',
  data,
});

export const generateReceipt = async (data: IDeserializedState | null): Promise<ResponseResult> => {
  if (!data) {
    throw new ApiBodyError();
  }

  const state = await serializeReceipt(data);
  const [isValid, errors] = getIsValid(state);
  if (!isValid) {
    throw new ApiValidationError(errors);
  }
  const validState = state as NonNullableState;
  const pdf = await pdfGenerator(validState);

  if (state.mode === 'download') {
    const dato = `${new Date().toISOString().split('T')[0]}`;
    const filename = `kvittering-${dato}-${+Date.now()}.pdf`;
    const downloadUrl = await uploadFileToS3Bucket(pdf, `receipts/${filename}`);
    return DOWNLOAD_SUCCESS_MESSAGE(downloadUrl);
  } else if (state.mode === 'email') {
    const pdfFile = new File([pdf], 'receipt.pdf', { type: 'application/pdf' });
    const pdfString = await readFileAsDataUrl(pdfFile);

    await sendEmail(pdfString, state);
    return EMAIL_SUCCESS_MESSAGE;
  } else if (state.mode === 'teapot') {
    return TEAPOT_SUCCESS;
  } else {
    throw new ApiValidationError([]);
  }
};
