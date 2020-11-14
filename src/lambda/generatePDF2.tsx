import React from 'react';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';

import { NonNullableState } from 'lambda/generatePDF';
import { PdfTemplate } from './components';
import { readFileAsBytes } from 'utils/readFileAsBytes';
import { attachJpg, attachPdf, attachPng } from './tools/attachments';
import { sleep } from './tools/sleep';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

const A_SATISFACTORY_AMOUNT_OF_TIME = 10000; // 10 seconds

export const pdfGenerator2 = async (form: NonNullableState): Promise<Blob | void> => {
  const browser = await puppeteer.launch({ headless: true });
  const sheet = new ServerStyleSheet();
  try {
    const signature = await readFileAsDataUrl(form.signature);
    const pdfHtml = renderToString(sheet.collectStyles(<PdfTemplate form={form} signature={signature} />));
    const styleTags = sheet.getStyleTags();
    sheet.seal();
    const page = await browser.newPage();
    await page.setContent(pdfHtml);
    await page.addStyleTag({ content: styleTags });
    const frontPage = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    await sleep(A_SATISFACTORY_AMOUNT_OF_TIME);

    /** Initialize a new PDF document as output */
    const frontPageDocument = await PDFDocument.load(frontPage);
    const outputPdf = await PDFDocument.create();
    const [documentPage] = await outputPdf.copyPages(frontPageDocument, [0]);
    outputPdf.addPage(documentPage);

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
    const pdfBlob = new Blob([pdfBytes]);
    return pdfBlob;
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
};
