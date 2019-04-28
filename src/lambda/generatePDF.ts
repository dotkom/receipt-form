import fs from 'fs';
import { drawImage, drawLinesOfText, drawText, PDFDocumentFactory, PDFDocumentWriter, StandardFonts } from 'pdf-lib';

import { IState } from 'form/state';
import { readFileAsArrayBuffer } from 'utils/readFileAsArrayBuffer';

import { getCurrentDateString } from './tools/date';
import { scaleDims } from './tools/scale';
import { createMultiLine, positionText } from './tools/text';

const readFile = async (path: Parameters<typeof fs.readFile>[0]) => {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

/**
 * Generates a Reciptform based on the input
 * TODO: Requires validation of fields
 */
export const pdfGenerator = async (inputForm: IState) => {
  try {
    const template = await readFile(__dirname + '/assets/template.pdf');

    const form = inputForm as { [K in keyof IState]: NonNullable<IState[K]> };

    // load the template reciptform
    const reciptform = PDFDocumentFactory.create();

    const templateReciptForm = PDFDocumentFactory.load(template);
    const [timesRomanRef] = templateReciptForm.embedStandardFont(StandardFonts.TimesRoman);

    const page = templateReciptForm.getPages()[0];

    page.addFontDictionary('TimesRoman', timesRomanRef);

    // place the textual input on the template reciptform
    const formContentStream = templateReciptForm.createContentStream(
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

    // place the reciptFormInput.signature

    // width/height of signature field

    const signatureAsArrayBuffer = await readFileAsArrayBuffer(form.signature);
    const signatureAsUnit8Array = new Uint8Array(signatureAsArrayBuffer);
    const [pngImage, pngDims] = templateReciptForm.embedPNG(signatureAsUnit8Array);

    const maxWidth = 397;
    const maxHeight = 97;
    const scaledSignDims = scaleDims(pngDims.width, pngDims.height, maxWidth, maxHeight);

    page.addImageObject('reciptFormInput.signature', pngImage);
    const signContentStream = templateReciptForm.createContentStream(
      drawImage('reciptFormInput.signature', {
        x: 161,
        y: 101,
        width: scaledSignDims.width,
        height: scaledSignDims.height,
      })
    );

    page.addContentStreams(
      templateReciptForm.register(formContentStream),
      templateReciptForm.register(signContentStream)
    );

    reciptform.addPage(page);

    // append the attachments
    for (const attachment of form.attachments) {
      const attachmentAsArrayBuffer = await readFileAsArrayBuffer(attachment);
      const uint8attachment = new Uint8Array(attachmentAsArrayBuffer);
      switch (attachment.type) {
        case 'image/jpg':
        case 'image/png':
          const pageSize = [350, 500] as [number, number];
          const attachmentPage = reciptform.createPage(pageSize);
          const [attachmentPngImage, attachmentPngDims] = templateReciptForm.embedPNG(uint8attachment);
          const scaled = scaleDims(attachmentPngDims.width, attachmentPngDims.height);

          attachmentPage.addImageObject('attachment', attachmentPngImage);
          const attachmentContentStream = templateReciptForm.createContentStream(
            drawImage('attachment', {
              x: 0,
              y: 0,
              width: scaled.width,
              height: scaled.height,
            })
          );

          attachmentPage.addContentStreams(templateReciptForm.register(attachmentContentStream));

          reciptform.addPage(attachmentPage);
          break;
        case 'application/pdf':
          const pdf = PDFDocumentFactory.load(uint8attachment);
          for (const pdfPage of pdf.getPages()) {
            reciptform.addPage(pdfPage);
          }
          break;
        default:
          throw new Error('Unsupported file type supplied as attachment');
      }
    }

    const pdfBytes = PDFDocumentWriter.saveToBytes(reciptform);

    return pdfBytes;
  } catch (err) {
    if (err.code === 'ENOENT') {
      // tslint:disable-next-line no-console
      console.error(err);
      return;
    }
    throw err;
  }
};
