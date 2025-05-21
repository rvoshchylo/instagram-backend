import * as crypto from 'crypto';
export const appSecretProof = (token: string) =>
  crypto
    .createHmac('sha256', process.env.FB_APP_SECRET!)
    .update(token)
    .digest('hex');
