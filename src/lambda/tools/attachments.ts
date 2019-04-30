import { drawImage, PDFDocument, PDFDocumentFactory, PDFIndirectReference, PDFRawStream } from 'pdf-lib';
import JPEGXObjectFactory from 'pdf-lib/lib/core/pdf-structures/factories/JPEGXObjectFactory';
import PNGXObjectFactory from 'pdf-lib/lib/core/pdf-structures/factories/PNGXObjectFactory';

import { scaleDims } from './scale';

const A4_PAGE_SIZE = [595, 842] as [number, number];

const attachImage = (
  imageReference: PDFIndirectReference<PDFRawStream>,
  imageFactory: JPEGXObjectFactory | PNGXObjectFactory,
  output: PDFDocument
) => {
  const { width, height } = imageFactory;
  const [pageWidth, pageHeight] = A4_PAGE_SIZE;

  const scaled = scaleDims(width, height, pageWidth, pageHeight);

  const attachmentPage = output.createPage(A4_PAGE_SIZE);
  attachmentPage.addImageObject('attachment', imageReference);

  const attachmentContentStream = output.createContentStream(
    drawImage('attachment', {
      x: pageWidth - scaled.width,
      y: pageHeight - scaled.height,
      width: scaled.width,
      height: scaled.height,
    })
  );

  attachmentPage.addContentStreams(output.register(attachmentContentStream));

  output.addPage(attachmentPage);
};

export const attachPNG = (fileData: Uint8Array, output: PDFDocument) => {
  const [attachmentImage, sizes] = output.embedPNG(fileData);
  attachImage(attachmentImage, sizes, output);
};

export const attachJPG = (fileData: Uint8Array, output: PDFDocument) => {
  const [attachmentImage, sizes] = output.embedJPG(fileData);
  attachImage(attachmentImage, sizes, output);
};

export const attachPDF = (pdfData: Uint8Array, output: PDFDocument) => {
  const pdf = PDFDocumentFactory.load(pdfData);
  for (const pdfPage of pdf.getPages()) {
    output.addPage(pdfPage);
  }
};
