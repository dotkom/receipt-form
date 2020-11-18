import fs from 'fs';
import { promisify } from 'util';

export const readFileAsync = promisify(fs.readFile);
