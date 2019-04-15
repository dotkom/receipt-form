import 'isomorphic-fetch';
import './polyfills';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IDeserializedState, serializeReceipt } from 'form/state';
import { getIsValid } from 'form/validation';

import { pdfGenerator } from './generatePDF';

export const MISSING_BODY: APIGatewayProxyResult = {
  statusCode: 400, // Bad request
  body: JSON.stringify({
    message: 'Missing request body',
  }),
};

export const VALIDATION_ERROR: APIGatewayProxyResult = {
  statusCode: 400,
  body: JSON.stringify({
    message: 'Receipt data is not valid',
  }),
};

export const GENERIC_ERROR: APIGatewayProxyResult = {
  statusCode: 400,
  body: JSON.stringify({
    message: 'Something went wrong during with the request',
  }),
};

exports.generateReceipt = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return MISSING_BODY;
  }

  /** Parse twice, since body is an escaped string. string -> JSON -> JS Object */
  const receiptJson = JSON.parse(JSON.parse(event.body)) as IDeserializedState;
  try {
    const state = await serializeReceipt(receiptJson);
    const [isValid, errors] = getIsValid(state);
    if (isValid) {
      const pdf = await pdfGenerator(state);
      return {
        statusCode: 201, // Created
        body: JSON.stringify({
          message: 'Created receipt as PDF',
          data: pdf,
        }),
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
