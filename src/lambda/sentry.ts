import * as Sentry from '@sentry/node';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { SENTRY_DSN } from 'constants/sentry';

Sentry.init({ dsn: SENTRY_DSN });

export const sentryMiddleware = (apiHandler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await apiHandler(req, res);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      await Sentry.flush(2000);
      throw error;
    }
  };
};
