import nodemailer from 'nodemailer';

import { DESTINATION_EMAIL, EXTRA_CC_EMAILS, SENDER_EMAIL } from 'constants/mail';
import { IState } from 'form/state';
import { getGroupName } from 'models/groups';

import { NonNullableState } from './generatePDF';
import { getFileName, getFormattedText } from './tools/format';
import { ApiEmailError } from './errors';

const extraEmails = EXTRA_CC_EMAILS.split(',');

const createTransporter = async (): Promise<ReturnType<typeof nodemailer.createTransport>> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL,
      serviceClient: process.env.NEXT_SERVICE_CLIENT_ID,
      privateKey: process.env.NEXT_SERVICE_PRIVATE_KEY,
    },
  });
  try {
    await transporter.verify();
    return transporter;
  } catch (err) {
    throw new ApiEmailError(err);
  }
};

export const sendEmail = async (pdf: string, formData: IState) => {
  const form = formData as NonNullableState;
  const transporter = await createTransporter();
  try {
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: DESTINATION_EMAIL,
      cc: [form.email, ...extraEmails],
      replyTo: form.email,
      subject: `[${getGroupName(form.committee)}] ${form.intent} - ${form.fullname}`,
      text: getFormattedText(form),
      attachments: [
        {
          filename: getFileName(form),
          path: pdf,
        },
      ],
    });
  } catch (err) {
    throw new ApiEmailError(err);
  }
};
