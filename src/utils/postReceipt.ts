import { LAMBDA_ENDPOINT, LAMBDA_KEY } from 'constants/aws';
import { IDeserializedState } from 'form/state';

export const postReceipt = async (receipt: IDeserializedState) => {
  const receiptString = JSON.stringify(receipt);
  const response = await post(receiptString);
  // tslint:disable-next-line no-console
  console.log(response);
};

const post = async (data: string) => {
  if (LAMBDA_ENDPOINT && LAMBDA_KEY) {
    const response = await fetch(LAMBDA_ENDPOINT, {
      body: data,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': LAMBDA_KEY,
      },
    });
    const json = await response.json();
    return json;
  }
};
