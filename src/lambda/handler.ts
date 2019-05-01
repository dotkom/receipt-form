import 'isomorphic-fetch';
import './polyfills';

import { IDeserializedState, serializeReceipt } from 'form/state';
import { getIsValid, IValidation } from 'form/validation';

import { pdfGenerator } from './generatePDF';

import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';
import { sendEmail } from './sendEmail';

export interface IResultMessage {
  statusCode: number;
  body: {
    message?: string;
    data?: string;
    validation?: IValidation[];
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

export const VALIDATION_ERROR = (validation: IValidation[]): IResultMessage => ({
  statusCode: 400,
  body: {
    message: 'Receipt data is not valid',
    validation,
  },
});

export const GENERIC_ERROR: IResultMessage = {
  statusCode: 400,
  body: {
    message: 'Something went wrong with the request',
  },
};

export const EMAIL_SUCCESS_MESSAGE: IResultMessage = {
  statusCode: 201,
  body: {
    message: 'Email was sent successfullt',
  },
};

export const EMAIL_ERROR_MESSAGE: IResultMessage = {
  statusCode: 500,
  body: {
    message: 'Something went wrong during the email transfer',
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
      if (state.mode === 'download') {
        return {
          statusCode: 201, // Created
          body: {
            message: 'Created receipt as PDF',
            data: pdfString,
          },
        };
      } else if (state.mode === 'email') {
        const emailSuccess = await sendEmail(pdfString, state);
        return emailSuccess ? EMAIL_SUCCESS_MESSAGE : EMAIL_ERROR_MESSAGE;
      }
    } else {
      VALIDATION_ERROR(errors);
    }
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(err);
    return GENERIC_ERROR;
  }
  return GENERIC_ERROR;
};
