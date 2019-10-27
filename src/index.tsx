import * as Sentry from '@sentry/browser';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { SentryBoundry } from 'components/SentryBoundry';
import { SENTRY_DSN } from 'constants/sentry';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: SENTRY_DSN,
});

const root = document.getElementById('root');
// @ts-ignore
ReactDOM.createRoot(root).render(
  <StrictMode>
    <SentryBoundry>
      <App />
    </SentryBoundry>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
