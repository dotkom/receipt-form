import * as Sentry from '@sentry/browser';
import React, { FC } from 'react';
import Head from 'next/head';

import { SentryBoundry } from 'components/SentryBoundry';
import { SENTRY_DSN } from 'constants/sentry';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import '../index.css';

Sentry.init({
  dsn: SENTRY_DSN,
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <SentryBoundry>
        <Component {...pageProps} />;
      </SentryBoundry>
    </>
  );
};

export default MyApp;
