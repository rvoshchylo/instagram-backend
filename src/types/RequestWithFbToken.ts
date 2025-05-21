import { Request } from 'express';

export interface RequestWithFbToken extends Request {
  fbToken: string;
}
