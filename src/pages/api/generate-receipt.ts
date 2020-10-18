import { NextApiRequest, NextApiResponse } from 'next';

import { IDeserializedState } from 'form/state';
import { handler, IResultMessage } from 'lambda/handler';
import { sentryMiddleware } from 'lambda/sentry';

export default sentryMiddleware(async (req: NextApiRequest, res: NextApiResponse<IResultMessage>) => {
  const data = await handler(req.body as IDeserializedState | null);
  res.json(data);
});
