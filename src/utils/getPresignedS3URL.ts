import AWS from "aws-sdk";

const credentials = (process.env.NEXT_AWS_ACCESS_KEY_ID && process.env.NEXT_AWS_SECRET_ACCESS_KEY) ?
  {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  } :
  undefined;

AWS.config.update({
  region: process.env.NEXT_AWS_REGION,
  credentials,
})

export const getPresignedS3URL = async (name: string, contentType: string) => {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME },
  })

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `uploads/${+new Date()}-${name}`,
    ContentType: contentType,
  }

  return { url: await s3.getSignedUrlPromise('putObject', params), key: params.Key }
}