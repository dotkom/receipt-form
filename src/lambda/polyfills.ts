import 'core-js/stable/array/flat';
import 'core-js/stable/array/flat-map';
import { JSDOM } from 'jsdom';
// @ts-ignore
import FileReaderImpl from 'jsdom/lib/jsdom/living/generated/FileReader';

const dom = new JSDOM();

declare global {
  namespace NodeJS {
    // tslint:disable-next-line interface-name
    interface Global {
      File: typeof dom.window.File;
      Blob: typeof dom.window.Blob;
      FileList: typeof dom.window.FileList;
      FileReader: typeof FileReader;
    }
  }
}

global.File = dom.window.File;
global.Blob = dom.window.Blob;
global.FileList = dom.window.FileList;
global.FileReader = FileReaderImpl.createInterface({ window: dom.window }).interface;
