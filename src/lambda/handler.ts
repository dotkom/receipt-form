import 'isomorphic-fetch';
import './polyfills';

import { IDeserializedState, serializeReceipt } from 'form/state';
import { getIsValid } from 'form/validation';

import { pdfGenerator } from './generatePDF';

import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

export interface IResultMessage {
  statusCode: number;
  body: {
    message?: string;
    data?: string;
  };
}

export const MISSING_PDF: IResultMessage = {
  statusCode: 500, // Bad request
  body: {
    message: 'PDF was not generated',
  },
};

export const MISSING_BODY: IResultMessage = {
  statusCode: 400, // Bad request
  body: {
    message: 'Missing request body',
  },
};

export const VALIDATION_ERROR: IResultMessage = {
  statusCode: 400,
  body: {
    message: 'Receipt data is not valid',
  },
};

export const GENERIC_ERROR: IResultMessage = {
  statusCode: 400,
  body: {
    message: 'Something went wrong during with the request',
  },
};

export const handler = async (data: IDeserializedState | null): Promise<IResultMessage> => {
  if (!data) {
    return MISSING_BODY;
  }

  try {
    const state = await serializeReceipt(data);
    const [isValid, errors] = getIsValid(state);
    if (isValid) {
      const pdf = await pdfGenerator(state);
      if (!pdf) {
        return MISSING_PDF;
      }
      const pdfBlob = new Blob([pdf]);
      const pdfFile = new File([pdfBlob], 'receipt.pdf', { type: 'application/pdf' });
      const pdfString = await readFileAsDataUrl(pdfFile);
      return {
        statusCode: 201, // Created
        body: {
          message: 'Created receipt as PDF',
          data: pdfString,
        },
      };
    } else {
      throw new Error(`Received invalid receipt data: ${errors}`);
    }
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(err);
    return VALIDATION_ERROR;
  }
  return GENERIC_ERROR;
};
