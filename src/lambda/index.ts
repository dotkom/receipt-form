import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import express from 'express';
import SourceMapSupport from 'source-map-support';

import { SENTRY_DSN } from 'constants/sentry';
import { IDeserializedState } from 'form/state';

import { handler } from './handler';
import { AUTH_FILE_PATH, getAuthFile } from './sendEmail';

/* Install support for using TypeScript source maps in the back-end */
SourceMapSupport.install();

const PORT = 8081;
const HOST = '0.0.0.0';

const app = express();

/* Init Sentry error handling for the server */
Sentry.init({ dsn: SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(bodyParser.json({ limit: '25MB' }));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/generate-receipt', async (req, res) => {
  const data = await handler(req.body as IDeserializedState | null);
  res.json(data);
});

app.listen(Number(PORT), HOST || '', () => {
  /* tslint:disable-next-line no-console */
  console.log(`Receipt Backend server running on ${HOST}:${PORT}`);
});

/** Make sure it is possible to exist the application in in Docker */
process.on('SIGINT', () => process.exit());

/** Warn about missing Gsuite authentication file */
getAuthFile().then((file) => {
  if (!file) {
    /* tslint:disable-next-line no-console */
    console.warn(`Gsuite authentcation file at ${AUTH_FILE_PATH} was not found, or is incorrect.`);
  }
});
