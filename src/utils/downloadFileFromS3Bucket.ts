import AWS from "aws-sdk";

const credentials = (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) ?
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } :
  undefined;

AWS.config.update({
  region: process.env.AWS_REGION,
  credentials,
})

export async function downloadFileFromS3Bucket(key: string): Promise<File> {
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME is not set');
  }

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
  });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  const data = await s3.getObject(params).promise();

  return new File([data.Body as Blob], key, { type: data.ContentType });
}
