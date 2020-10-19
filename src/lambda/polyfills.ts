import 'core-js/stable/array/flat';
import 'core-js/stable/array/flat-map';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
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
global.FileReader = dom.window.FileReader;
