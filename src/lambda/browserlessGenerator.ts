import Document from 'pdfkit';
import getStream from 'get-stream';
import { EncryptedAttachmentError, PdfRenderError } from './errors';
import { mergeAttachments, NonNullableState } from './generatePDF';
import { getCurrentDateString } from './tools/date';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';
import { getGroupName } from 'models/groups';

const createTableRow = (document: PDFKit.PDFDocument, height: number, label: string, value: string) => {
  document.fontSize(14).text(label, 100, height).text(value, 220, height);
};

const createTableDocument = async (state: NonNullableState): Promise<Buffer> => {
  const pdf = new Document();
  pdf.fontSize(25).text('Kvitteringsskjema', 100, 80);
  createTableRow(pdf, 120, 'Navn: ', state.fullname);
  createTableRow(pdf, 140, 'Epost: ', state.email);
  createTableRow(pdf, 160, 'Ansvarlig enhet: ', getGroupName(state.committee));
  createTableRow(pdf, 180, 'Dato: ', getCurrentDateString());
  if (state.type === 'card') {
    createTableRow(pdf, 200, 'Kontonummer: ', state.cardDetails);
  } else {
    createTableRow(pdf, 200, 'Kontonummer: ', state.account);
  }
  createTableRow(pdf, 220, 'Beløp: ', state.amount.toString());
  createTableRow(pdf, 240, 'Anledning: ', state.intent);
  createTableRow(pdf, 260, 'Type: ', state.type === 'card' ? 'Bankkort' : 'Utlegg');
  pdf.fontSize(14).text('Kommentar', 100, 300).moveDown().text(state.comments, {
    width: 412,
    align: 'justify',
    indent: 0,
    columns: 1,
    height: 300,
    ellipsis: true,
  });
  const image = await readFileAsDataUrl(state.signature);
  pdf.image(image, 100, 600, { width: 400 });
  pdf.end();
  return await getStream.buffer(pdf);
};

export const pdfGenerator = async (form: NonNullableState): Promise<Uint8Array> => {
  try {
    const table = await createTableDocument(form);
    const completePdf = await mergeAttachments(table, form.attachments);
    // await setTimeoutAsync(5000);
    return completePdf;
  } catch (error) {
    if (error.message.includes('encrypted')) {
      throw new EncryptedAttachmentError(error.message);
    }
    throw new PdfRenderError(error);
  }
};
