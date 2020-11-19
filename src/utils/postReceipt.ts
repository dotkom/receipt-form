import { ApiResponse } from './../redux/reducers/statusReducer';
import { LAMBDA_ENDPOINT } from 'constants/backend';
import { deserializeReceipt, IState } from 'form/state';
import { SuccessBody } from 'lambda/handler';
import { ErrorData } from 'lambda/errors';

export const postReceipt = async (state: IState) => {
  const receipt = await deserializeReceipt(state);
  const receiptString = JSON.stringify(receipt);
  const response = await post(receiptString);
  return response;
};

const FETCH_ERROR: ApiResponse = {
  statusCode: 500,
  body: {
    message: 'Det var ikke mulig å opprette kontakt med serveren, ta kontakt med Dotkom.',
  },
};

const MISSING_ENDPOINT: ApiResponse = {
  statusCode: 500,
  body: {
    message: 'Endepunktet for PDF generering er ikke konfigurert, vennligst ta kontakt med Dotkom.',
  },
};

const post = async (data: string): Promise<ApiResponse> => {
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

      const body = await response.json();

      if (response && response.ok) {
        return {
          statusCode: response.status,
          body: body as SuccessBody,
        };
      } else {
        return {
          statusCode: response.status,
          body: body as ErrorData,
        };
      }
    } catch (err) {
      return FETCH_ERROR;
    }
  } else {
    return MISSING_ENDPOINT;
  }
};
