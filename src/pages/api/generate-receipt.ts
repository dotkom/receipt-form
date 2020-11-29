import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import { IDeserializedState } from 'form/state';
import { generateReceipt, SuccessBody } from 'lambda/handler';
import { sentryMiddleware } from 'lambda/sentry';
import { ApiError, ErrorData } from 'lambda/errors';

const handler = async (req: NextApiRequest, res: NextApiResponse<SuccessBody | ErrorData>) => {
  try {
    const responseResult = await generateReceipt(req.body as IDeserializedState | null);
    const { statusCode, ...responseBody } = responseResult;
    res.status(statusCode).json(responseBody);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.getData());
      throw error;
    } else {
      res.status(400).end();
      throw error;
    }
  }
};

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default sentryMiddleware(handler);
