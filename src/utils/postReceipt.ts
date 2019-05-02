import { LAMBDA_ENDPOINT } from 'constants/backend';
import { deserializeReceipt, IState } from 'form/state';
import { IResultMessage } from 'lambda/handler';

export const postReceipt = async (state: IState) => {
  const receipt = await deserializeReceipt(state);
  const receiptString = JSON.stringify(receipt);
  const response = await post(receiptString);
  return response;
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
