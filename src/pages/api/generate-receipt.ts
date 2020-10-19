import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import { IDeserializedState } from 'form/state';
import { generateReceipt, IResultMessage } from 'lambda/handler';
import { sentryMiddleware } from 'lambda/sentry';

const handler = async (req: NextApiRequest, res: NextApiResponse<IResultMessage>) => {
  const data = await generateReceipt(req.body as IDeserializedState | null);
  res.json(data);
};

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default sentryMiddleware(handler);
