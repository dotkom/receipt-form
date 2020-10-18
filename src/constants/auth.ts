export const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_AUTH_ENDPOINT || 'https://online.ntnu.no/openid';
export const AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || '';
export const AUTH_CALLBACK = typeof window !== 'undefined' ? `${window.location.origin}/` : '';
