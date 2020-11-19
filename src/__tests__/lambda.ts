import { ApiValidationError, ApiBodyError, ConfigError, PdfRenderError } from './../lambda/errors';
import MimeTypes from 'mime-types';

import { readFileAsync } from 'lambda/tools/readFileAsync';
import { IDeserializedState } from 'form/state';
import { generateReceipt } from 'lambda/handler';

const getDeserializedAssetFile = async (path: string) => {
  const fileString = await readFileAsync(`./src/__tests__/assets/${path}`, { encoding: 'base64' });
  const mimeType = MimeTypes.lookup(path);
  const dataUrl = `data:${mimeType};base64,${fileString}`;
  return dataUrl;
};

const getValidForm = async (): Promise<IDeserializedState> => {
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

test('Receipt is correctly generated with valid state', async () => {
  const form = await getValidForm();
  const { statusCode } = await generateReceipt(form);

  expect(statusCode).toBe(201);
});

test('Receipt is correctly generated with all allowed file types', async () => {
  const form = await getValidForm();
  form.attachments = await Promise.all([
    getDeserializedAssetFile('signature.png'),
    getDeserializedAssetFile('cursed-cat.jpg'),
    getDeserializedAssetFile('example.pdf'),
  ]);
  const { statusCode } = await generateReceipt(form);

  expect(statusCode).toBe(201);
});

test('Error is thrown when attachments contain an unsuported file type', async () => {
  const form = await getValidForm();
  form.attachments = await Promise.all([getDeserializedAssetFile('hello.gif')]);

  const handler1 = async () => {
    await generateReceipt(form);
  };
  expect(handler1).rejects.toThrow(PdfRenderError);

  /** Also check when it contains one wrong and one correct */
  form.attachments = await Promise.all([
    getDeserializedAssetFile('cursed-cat.jpg'),
    getDeserializedAssetFile('hello.gif'),
  ]);

  const handler2 = async () => {
    await generateReceipt(form);
  };
  expect(handler2).rejects.toThrow(PdfRenderError);
});

test('Invalid receipt returns a 400 with validation errors', async () => {
  const form = await getValidForm();
  form.amount = -1;
  const handler = async () => {
    await generateReceipt(form);
  };

  expect(handler).rejects.toThrow(ApiValidationError);
});

test('Empty body throws body error', async () => {
  const handler = async () => {
    await generateReceipt(null);
  };

  expect(handler).rejects.toThrow(ApiBodyError);
});

test('Malformed body throws body error', async () => {
  const handler = async () => {
    await generateReceipt(({ foo: 'bar', baz: 200 } as unknown) as IDeserializedState);
  };

  expect(handler).rejects.toThrow(ApiBodyError);
});

test('Warning level validation should should still generate receipt', async () => {
  const form = await getValidForm();
  form.mode = 'download';
  form.comments = '';
  form.email = 'test@test.com';
  const { statusCode, data } = await generateReceipt(form);

  expect(statusCode).toBe(201);
  expect(data).toBeDefined();
});

test('Email mode should throw when not configured correctly for testing', async () => {
  const form = await getValidForm();
  form.mode = 'email';
  const handler = async () => {
    await generateReceipt(form);
  };

  expect(handler).rejects.toThrow(ConfigError);
});
