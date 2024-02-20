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

// upload file to S3 bucket and make it publicly downloadable
export async function uploadFileToS3Bucket(file: Uint8Array, key: string): Promise<string> {
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME is not set');
  }
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: process.env.AWS_S3_BUCKET_NAME },
  });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: file,
    ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();

  return result.Location;
}