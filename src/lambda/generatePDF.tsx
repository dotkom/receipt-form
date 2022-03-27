import React from 'react';
import { PDFDocument } from 'pdf-lib';
import puppeteer, { Browser } from 'puppeteer';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';

import { PdfTemplate } from './components';
import { readFileAsBytes } from 'utils/readFileAsBytes';
import { attachJpg, attachPdf, attachPng } from './tools/attachments';
import { setTimeoutAsync } from './tools/timeout';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';
import { EncryptedAttachmentError, PdfRenderError } from './errors';
import { NODE_ENV } from 'constants/common';
import { IState } from 'form/state';

const A_SATISFACTORY_AMOUNT_OF_TIME = NODE_ENV === 'test' ? 1 : 5000; // 5 seconds

export type NonNullableState = { [K in keyof IState]: NonNullable<IState[K]> };

const renderToStringWithStyles = (...params: Parameters<typeof renderToString>) => {
  const sheet = new ServerStyleSheet();
  try {
    const htmlString = renderToString(sheet.collectStyles(...params));
    const cssString = sheet.getStyleTags();
    return [htmlString, cssString] as [string, string];
  } catch (error) {
    throw error;
  } finally {
    sheet.seal();
  }
};

const renderStringToPdf = async (html: string, css: string) => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox '] });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.addStyleTag({ content: css });
    const pagePdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
    return pagePdf;
  } catch (error) {
    throw error;
  } finally {
    await browser?.close();
  }
};

export const mergeAttachments = async (pdf: Buffer, attachments: File[]) => {
  /** Initialize a new PDF document as output */
  const frontPageDocument = await PDFDocument.load(new Uint8Array(pdf));
  const outputPdf = await PDFDocument.create();
  const [documentPage] = await outputPdf.copyPages(frontPageDocument, [0]);
  outputPdf.addPage(documentPage);

  /** Load all attachments as separate pages */
  for (const attachment of attachments) {
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
};

export const pdfGenerator = async (form: NonNullableState): Promise<Uint8Array> => {
  try {
    const signature = await readFileAsDataUrl(form.signature);
    const [html, css] = renderToStringWithStyles(<PdfTemplate form={form} signature={signature} />);
    const pdf = await renderStringToPdf(html, css);
    const completePdf = await mergeAttachments(pdf, form.attachments);
    await setTimeoutAsync(A_SATISFACTORY_AMOUNT_OF_TIME);
    return completePdf;
  } catch (error: any) {
    if (error.message.includes('encrypted')) {
      throw new EncryptedAttachmentError(error.message);
    }
    throw new PdfRenderError(error);
  }
};
