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

export const getPresignedS3URL = async (name: string, contentType: string) => {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: process.env.AWS_S3_BUCKET_NAME },
  })

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${+new Date()}-${name}`,
    ContentType: contentType,
  }

  return { url: await s3.getSignedUrlPromise('putObject', params), key: params.Key }
}