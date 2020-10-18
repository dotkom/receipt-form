import * as path from 'path';
import nodemailer from 'nodemailer';
import getConfig from 'next/config';

import { DESTINATION_EMAIL, EXTRA_CC_EMAILS, SENDER_EMAIL } from 'constants/mail';
import { IState } from 'form/state';

import { NonNullableState } from './generatePDF';
import { getFileName, getFormattedText } from './tools/format';
import { readFileAsync } from './tools/readFileAsync';

const { serverRuntimeConfig } = getConfig();

const extraEmails = EXTRA_CC_EMAILS.split(',');

export interface IGoogleAuthFile {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export const AUTH_FILE_PATH = path.join(serverRuntimeConfig.PROJECT_ROOT, './keys/gsuite.json');

export const getAuthFile = async (): Promise<null | IGoogleAuthFile> => {
  try {
    const file = await readFileAsync(AUTH_FILE_PATH);
    return JSON.parse(file.toString()) as IGoogleAuthFile;
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(err);
    return null;
  }
};

const createTransporter = async (): Promise<null | ReturnType<typeof nodemailer.createTransport>> => {
  const authFile = await getAuthFile();
  if (authFile) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        serviceClient: authFile.client_id,
        privateKey: authFile.private_key,
      },
    });
    try {
      await transporter.verify();
      return transporter;
    } catch (err) {
      // tslint:disable-next-line no-console
      console.error(err);
      return null;
    }
  } else {
    return null;
  }
};

export const sendEmail = async (pdf: string, formData: IState): Promise<boolean> => {
  const form = formData as NonNullableState;
  const authFile = await getAuthFile();
  if (!authFile) {
    throw new Error(`Gsuite authentcation file at ${AUTH_FILE_PATH} was not found, or is incorrect.`);
  }
  const transporter = await createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: SENDER_EMAIL,
        to: DESTINATION_EMAIL,
        cc: [form.email, ...extraEmails],
        replyTo: form.email,
        subject: `[${form.committee.shortName}] ${form.intent} - ${form.fullname}`,
        text: getFormattedText(form),
        attachments: [
          {
            filename: getFileName(form),
            path: pdf,
          },
        ],
      });
      return true;
    } catch (err) {
      // tslint:disable-next-line no-console
      console.error(err);
      return false;
    }
  }
  return false;
};
