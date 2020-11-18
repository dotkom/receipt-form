import * as path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import getConfig from 'next/config';

import { IState } from 'form/state';
import { readFileAsBytes } from 'utils/readFileAsBytes';

import { attachJpg, attachPdf, attachPng } from './tools/attachments';
import { embedSignature, embedText } from './tools/embed';
import { readFileAsync } from './tools/readFileAsync';

const { serverRuntimeConfig } = getConfig();

export type NonNullableState = { [K in keyof IState]: NonNullable<IState[K]> };

/**
 * Generates a Reciptform based on the input
 */
export const pdfGenerator = async (form: NonNullableState) => {
  try {
    /** Initialize template from file */
    const templatePath = path.join(serverRuntimeConfig.PROJECT_ROOT, './src/lambda/assets/template.pdf');
    const templateFile = await readFileAsync(templatePath);
    const template = await PDFDocument.load(new Uint8Array(templateFile));

    /** Initialize a new PDF document as output */
    const outputPdf = await PDFDocument.create();
    const timesRomanRef = outputPdf.embedStandardFont(StandardFonts.TimesRoman);

    /** Load text and signature to templated page */
    const [page] = await outputPdf.copyPages(template, [0]);
    page.setFont(timesRomanRef);
    embedText(form, page);
    await embedSignature(form.signature, outputPdf, page);
    outputPdf.addPage(page);

    /** Load all attachments as separate pages */
    for (const attachment of form.attachments) {
      const attachmentBytes = await readFileAsBytes(attachment);
      switch (attachment.type) {
        case 'image/jpeg':
          await attachJpg(attachmentBytes, outputPdf);
          break;
        case 'image/png':
          await attachPng(attachmentBytes, outputPdf);
          break;
        case 'application/pdf':
          await attachPdf(attachmentBytes, outputPdf);
          break;
        default:
          throw new Error('Unsupported file type supplied as attachment');
      }
    }

    const pdfBytes = await outputPdf.save();
    return pdfBytes;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(err);
      return;
    }
    throw err;
  }
};
