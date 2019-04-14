import fs from 'fs';
import { PDFDocumentFactory, PDFDocumentWriter, StandardFonts } from 'pdf-lib';

import { IState } from 'form/state';

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
export const pdfGenerator = async (_: IState) => {
  try {
    const fd = await readFile('./assets/template.pdf');

    // load the template reciptform
    const reciptform = PDFDocumentFactory.create();

    const templateReciptForm = PDFDocumentFactory.load(fd);
    const [timesRomanRef] = templateReciptForm.embedStandardFont(StandardFonts.TimesRoman);

    const page = templateReciptForm.getPages()[0];

    page.addFontDictionary('TimesRoman', timesRomanRef);

    const pdfBytes = PDFDocumentWriter.saveToBytes(reciptform);

    return pdfBytes;
  } catch (err) {
    if (err.code === 'ENOENT') {
      // tslint:disable-next-line no-console
      console.error('./assets/template.pdf file not found');
      return;
    }
    throw err;
  }
};
