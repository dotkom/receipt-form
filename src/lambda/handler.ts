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
    message: 'Noe gikk galt, og PDF-en ble ikke generert. Vennligst prøv om igjen, eller ta kontakt med Dotkom.',
  },
};

export const MISSING_BODY: IResultMessage = {
  statusCode: 400, // Bad request
  body: {
    message: 'Det ble ikke sendt data med forespørselen, vennligst last inn siden på nytt og prøv igjen.',
  },
};

export const VALIDATION_ERROR = (validation: IValidation[]): IResultMessage => ({
  statusCode: 400,
  body: {
    message: 'Skjemaet passerer ikke validering, vennligst last inn siden på nytt og prøv igjen.',
    validation,
  },
});

export const GENERIC_ERROR: IResultMessage = {
  statusCode: 400,
  body: {
    message: 'Noe ser ut til å ha gått galt under prosesseringen, vennligst last inn siden på nytt og prøv igjen.',
  },
};

export const EMAIL_SUCCESS_MESSAGE: IResultMessage = {
  statusCode: 201,
  body: {
    message: 'E-post har blitt sendt til Bankom, med deg på kopi. Takk for at du bruker digital kvitteringsskjema!',
  },
};

export const EMAIL_ERROR_MESSAGE: IResultMessage = {
  statusCode: 500,
  body: {
    message: 'Noe gikk galt under sendingen av E-post, vennligst prøv igjen eller ta kontakt med Dotkom.',
  },
};

export const DOWNLOAD_SUCCESS_MESSAGE = (data: string): IResultMessage => ({
  statusCode: 201, // Created
  body: {
    message: 'Kvitteringsskjema ble generert som PDF, og lastes nå ned til din enhet!',
    data,
  },
});

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
        return DOWNLOAD_SUCCESS_MESSAGE(pdfString);
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
