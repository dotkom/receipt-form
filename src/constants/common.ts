export const NODE_ENV = process.env.NODE_ENV;

export const PROD = NODE_ENV === 'production';
export const DEV = NODE_ENV === 'development';
export const TEST = NODE_ENV === 'test';
