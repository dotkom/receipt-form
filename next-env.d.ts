/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION?: string;
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_S3_BUCKET_NAME?: string;
      LAMBDA_PRESIGN_UPLOAD_ENDPOINT?: string;
    }
  }
}
