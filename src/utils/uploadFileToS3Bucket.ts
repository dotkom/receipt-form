import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY as string,
  },
})

// upload file to S3 bucket and make it publicly downloadable
export async function uploadFileToS3Bucket(file: Uint8Array, key: string): Promise<string> {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string },
  });

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string,
    Key: key,
    Body: file,
    ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();

  return result.Location;
}