import { NODE_ENV } from './common';

export const GIT_BRANCH = process.env.NEXT_PUBLIC_GIT_BRANCH || null;
export const GIT_TAG = process.env.NEXT_PUBLIC_GIT_TAG || null;

export const APP_VERSION = GIT_TAG ?? GIT_BRANCH ?? NODE_ENV;
