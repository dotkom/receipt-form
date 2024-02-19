import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import { SuccessBody } from 'lambda/handler';
import { sentryMiddleware } from 'lambda/sentry';
import { ErrorData } from 'lambda/errors';
import { getPresignedS3URL } from "../../utils/getPresignedS3URL";

const handler = async (req: NextApiRequest, res: NextApiResponse<SuccessBody | ErrorData>) => {
  const { filename, contentType } = req.body;

  try {
    const data = await getPresignedS3URL(filename, contentType);
    res.status(200).json({ message: "Presigned URL", data: JSON.stringify(data) });
  } catch (error) {
    res.status(500).json({ message: "Failed to get presigned URL", data: error });
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
