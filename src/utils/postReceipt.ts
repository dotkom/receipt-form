import { LAMBDA_ENDPOINT } from 'constants/backend';
import { deserializeReceipt, IState } from 'form/state';
import { IResultMessage } from 'lambda/handler';
import { getCurrentDateString } from 'lambda/tools/date';

import { downloadFile } from './download';
import { readDataUrlAsFile } from './readDataUrlAsFile';

export const postReceipt = async (state: IState) => {
  const receipt = await deserializeReceipt(state);
  const receiptString = JSON.stringify(receipt);
  const response = await post(receiptString);
  if (response) {
    if (response.body.data) {
      const fileName = `Kvittering-${state.intent}-${getCurrentDateString()}`;
      const pdfFile = await readDataUrlAsFile(response.body.data, fileName);
      if (pdfFile) {
        downloadFile(pdfFile);
      }
    }
  }
};

const post = async (data: string) => {
  if (LAMBDA_ENDPOINT) {
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
  }
  return null;
};
