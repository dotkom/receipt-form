import { EncryptedAttachmentError } from './../lambda/errors';
import { IDeserializedState } from 'form/state';
import { ApiValidationError, ApiBodyError, ConfigError, PdfRenderError } from 'lambda/errors';
import { generateReceipt } from 'lambda/handler';
import { getDeserializedAssetFile, getValidForm } from 'utils/testing';

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

test('Error is thrown when attachments contain an encrypted PDF', async () => {
  const form = await getValidForm();
  form.attachments = await Promise.all([getDeserializedAssetFile('encrypted.pdf')]);

  const handler = async () => {
    await generateReceipt(form);
  };
  expect(handler).rejects.toThrow(EncryptedAttachmentError);
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
