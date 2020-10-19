import { PDFDocument, PDFPage } from 'pdf-lib';

import { readFileAsBytes } from 'utils/readFileAsBytes';
import { NonNullableState } from '../generatePDF';
import { getCurrentDateString } from './date';
import { formatAmount } from './format';
import { scaleDims } from './scale';
import { createMultiLine, positionText } from './text';

export const embedText = (form: NonNullableState, page: PDFPage) => {
  // place the textual input on the template reciptform
  page.drawText(form.fullname, positionText(165, 627));
  page.drawText(form.fullname, positionText(165, 627));
  page.drawText(form.email, positionText(165, 599));
  page.drawText(form.committee.name, positionText(165, 571));
  page.drawText(getCurrentDateString(), positionText(441, 571));
  page.drawText(form.type === 'card' ? form.cardDetails : form.account, positionText(165, 527));
  page.drawText(`${formatAmount(form.amount)} kr`, positionText(441, 527));
  page.drawText(form.intent, positionText(165, 483));
  page.drawText(form.type === 'deposit' ? 'X' : '', positionText(392, 483));
  page.drawText(form.type === 'card' ? 'X' : '', positionText(392, 466));
  page.drawText(createMultiLine(form.comments || ''), positionText(165, 440));
};

export const embedSignature = async (signature: File, outputPDF: PDFDocument, page: PDFPage) => {
  const signatureBytes = await readFileAsBytes(signature);
  const pngImage = await outputPDF.embedPng(signatureBytes);
  const { width, height } = pngImage;

  const MAX_WIDTH = 370;
  const MAX_HEIGHT = 80;
  const scaled = scaleDims(width, height, MAX_WIDTH, MAX_HEIGHT);

  page.drawImage(pngImage, {
    x: 163,
    y: 110,
    width: scaled.width,
    height: scaled.height,
  });
};
