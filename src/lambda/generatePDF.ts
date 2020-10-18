import * as path from 'path';
import { PDFDocumentFactory, PDFDocumentWriter, StandardFonts } from 'pdf-lib';
import getConfig from 'next/config';

import { IState } from 'form/state';
import { readFileAsBytes } from 'utils/readFileAsBytes';

import { attachJPG, attachPDF, attachPNG } from './tools/attachments';
import { embedSignature, embedText } from './tools/embed';
import { readFileAsync } from './tools/readFileAsync';

const { serverRuntimeConfig } = getConfig();

export type NonNullableState = { [K in keyof IState]: NonNullable<IState[K]> };

/**
 * Generates a Reciptform based on the input
 * TODO: Requires validation of fields
 */
export const pdfGenerator = async (inputForm: IState) => {
  try {
    const form = inputForm as NonNullableState;

    /** Initialize template from file */
    const templatePath = path.join(serverRuntimeConfig.PROJECT_ROOT, './src/lambda/assets/template.pdf');
    const templateFile = await readFileAsync(templatePath);
    const template = PDFDocumentFactory.load(templateFile);

    /** Initialize a new PDF document as output */
    const outputPDF = PDFDocumentFactory.create();
    const [timesRomanRef] = template.embedStandardFont(StandardFonts.TimesRoman);

    /** Load text and signature to templated page */
    const page = template.getPages()[0];
    page.addFontDictionary('TimesRoman', timesRomanRef);
    embedText(form, template, page);
    await embedSignature(form.signature, template, page);
    outputPDF.addPage(page);

    /** Load all attachments as separate pages */
    for (const attachment of form.attachments) {
      const attachmentBytes = await readFileAsBytes(attachment);
      switch (attachment.type) {
        case 'image/jpeg':
          attachJPG(attachmentBytes, outputPDF);
          break;
        case 'image/png':
          attachPNG(attachmentBytes, outputPDF);
          break;
        case 'application/pdf':
          attachPDF(attachmentBytes, outputPDF);
          break;
        default:
          throw new Error('Unsupported file type supplied as attachment');
      }
    }

    const pdfBytes = PDFDocumentWriter.saveToBytes(outputPDF);
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
