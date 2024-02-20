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

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

const createPresignedPost = (params: AWS.S3.PresignedPost.Params): Promise<AWS.S3.PresignedPost> => new Promise((resolve, reject) => {
  s3.createPresignedPost(params, function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data)
    }
  });
});

export const getPresignedS3URL = async (name: string, contentType: string): Promise<{ url: string, fields: {[key: string]: string}}> => {
  return await createPresignedPost({
    Bucket: "receipt-form",
    Fields: {
      key: `uploads/${+new Date()}-${name}`,
      "Content-Type": contentType,
    },
    Conditions: [
      ["content-length-range", 0, 1024 * 1024 * 25],
    ],
    Expires: 60,
  })
}