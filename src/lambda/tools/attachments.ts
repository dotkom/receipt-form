import { PageSizes, PDFDocument, PDFImage } from 'pdf-lib';

import { scaleDims } from './scale';

const attachImage = (image: PDFImage, output: PDFDocument) => {
  const [pageWidth, pageHeight] = PageSizes.A4;
  const { width, height } = image;

  const scaled = scaleDims(width, height, pageWidth, pageHeight);

  const attachmentPage = output.addPage(PageSizes.A4);
  attachmentPage.drawImage(image, {
    x: pageWidth - scaled.width,
    y: pageHeight - scaled.height,
    width: scaled.width,
    height: scaled.height,
  });
};

export const attachPng = async (fileData: Uint8Array, output: PDFDocument) => {
  const pngImage = await output.embedPng(fileData);
  attachImage(pngImage, output);
};

export const attachJpg = async (fileData: Uint8Array, output: PDFDocument) => {
  const jpgImage = await output.embedJpg(fileData);
  attachImage(jpgImage, output);
};

export const attachPdf = async (pdfData: Uint8Array, output: PDFDocument) => {
  const pdf = await PDFDocument.load(pdfData);
  const copiedPages = await output.copyPages(pdf, pdf.getPageIndices());
  copiedPages.forEach((page) => {
    output.addPage(page);
  });
};
