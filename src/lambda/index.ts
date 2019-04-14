import 'isomorphic-fetch';
import './polyfills';

import { IDeserializedState, serializeReceipt } from 'form/state';
import { ValidationLevel } from 'form/validation';
import { validate } from 'hooks/useReceiptData';

import { pdfGenerator } from './generatePDF';

exports.generateReceipt = async (event: IDeserializedState): Promise<any> => {
  const state = await serializeReceipt(event);
  const validation = validate(state);
  const errors = Object.values(validation)
    .flat()
    .filter((val) => val.level === ValidationLevel.REQUIRED && !val.valid);
  const isValid = errors.length === 0;

  // tslint:disable-next-line no-console
  console.log('valid', isValid);

  if (isValid) {
    const pdf = await pdfGenerator(state);
    // tslint:disable-next-line no-console
    console.log(pdf);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'generated receipt',
        type: 'application/pdf',
        content: 'none',
      }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Invalid form',
      }),
    };
  }
};
