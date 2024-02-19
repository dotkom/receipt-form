import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY as string,
  },
})

export async function downloadFileFromS3Bucket(key: string): Promise<File> {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
  });

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string,
    Key: key,
  };

  const data = await s3.getObject(params).promise();

  return new File([data.Body as Blob], key, { type: data.ContentType });
}
