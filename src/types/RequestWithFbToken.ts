import { Request } from 'express';

export interface RequestWithFbToken extends Request {
  fbToken: string;
  fb_token: string;
}
