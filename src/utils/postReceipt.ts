import { LAMBDA_ENDPOINT } from 'constants/backend';
import { deserializeReceipt, IState } from 'form/state';
import { IResultMessage } from 'lambda/handler';

export const postReceipt = async (state: IState) => {
  const receipt = await deserializeReceipt(state);
  const receiptString = JSON.stringify(receipt);
  const response = await post(receiptString);
  return response;
};

const FETCH_ERROR: IResultMessage = {
  statusCode: 500,
  body: {
    message: 'Det var ikke mulig å oprette kontakt med serveren, ta kontakt med Dotkom.',
  },
};

const MISSING_ENDPOINT: IResultMessage = {
  statusCode: 500,
  body: {
    message: 'Endepunktet for PDF generering er ikke konfigurert, vennligst ta kontakt med Dotkom.',
  },
};

const post = async (data: string) => {
  if (LAMBDA_ENDPOINT) {
    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        body: data,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response && response.ok) {
        const json = await response.json();
        return json as IResultMessage;
      }
    } catch (err) {
      return FETCH_ERROR;
    }
  } else {
    return MISSING_ENDPOINT;
  }
  return null;
};
