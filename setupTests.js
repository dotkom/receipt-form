// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-fetch';

import { setConfig } from 'next/config';
import { publicRuntimeConfig, serverRuntimeConfig } from './next.config';

// Make sure you can use "publicRuntimeConfig" and "serverRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig, serverRuntimeConfig });
