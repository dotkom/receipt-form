import { drawImage, drawLinesOfText, drawText, PDFDocument, PDFPage } from 'pdf-lib';

import { readFileAsBytes } from 'utils/readFileAsBytes';
import { NonNullableState } from '../generatePDF';
import { getCurrentDateString } from './date';
import { scaleDims } from './scale';
import { createMultiLine, positionText } from './text';

export const embedText = (form: NonNullableState, outputPDF: PDFDocument, page: PDFPage) => {
  // place the textual input on the template reciptform
  const formContentStream = outputPDF.createContentStream(
    drawText(form.fullname, positionText(165, 627)),
    drawText(form.email, positionText(165, 599)),
    drawText(form.committee.name, positionText(165, 571)),
    drawText(getCurrentDateString(), positionText(441, 571)),
    drawText(form.account, positionText(165, 527)),
    drawText(String(form.amount), positionText(441, 527)),
    drawText(form.intent, positionText(165, 483)),
    drawText(form.type === 'deposit' ? 'X' : '', positionText(392, 483)),
    drawText(form.type === 'card' ? 'X' : '', positionText(392, 466)),
    drawLinesOfText(createMultiLine(form.comments), positionText(165, 440))
  );

  page.addContentStreams(outputPDF.register(formContentStream));
};

export const embedSignature = async (signature: File, outputPDF: PDFDocument, page: PDFPage) => {
  const signatureBytes = await readFileAsBytes(signature);
  const [image, { width, height }] = outputPDF.embedPNG(signatureBytes);

  const MAX_WIDTH = 370;
  const MAX_HEIGHT = 80;
  const scaled = scaleDims(width, height, MAX_WIDTH, MAX_HEIGHT);

  page.addImageObject('reciptFormInput.signature', image);
  const signContentStream = outputPDF.createContentStream(
    drawImage('reciptFormInput.signature', {
      x: 163,
      y: 110,
      width: scaled.width,
      height: scaled.height,
    })
  );

  page.addContentStreams(outputPDF.register(signContentStream));
};
