import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestWithFbToken } from 'src/types/RequestWithFbToken';

@Injectable()
export class FacebookTokenMiddleware implements NestMiddleware {
  use(req: RequestWithFbToken, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : undefined;

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    req.fbToken = token;
    next();
  }
}
