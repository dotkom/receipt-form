import MimeTypes from 'mime-types';

import { readFileAsync } from 'lambda/tools/readFileAsync';
import { IDeserializedState } from 'form/state';

export const getDeserializedAssetFile = async (path: string) => {
  const fileString = await readFileAsync(`./src/__tests__/assets/${path}`, { encoding: 'base64' });
  const mimeType = MimeTypes.lookup(path);
  const dataUrl = `data:${mimeType};base64,${fileString}`;
  return dataUrl;
};

export const getValidForm = async (): Promise<IDeserializedState> => {
  const signature = await getDeserializedAssetFile('signature.png');
  const attachemnt1 = await getDeserializedAssetFile('cursed-cat.jpg');
  return {
    fullname: 'Ola Nordmann',
    email: 'ola.nordmann@online.ntnu.no',
    signature,
    type: 'deposit',
    amount: 100,
    intent: 'TEST',
    account: '0000 00 00000',
    cardDetails: null,
    committee: { id: -1, name: 'Onlinepotten', email: 'hovedstyret@online.ntnu.no' },
    comments: 'Dette er en test',
    attachments: [attachemnt1],
    mode: 'download',
  };
};
