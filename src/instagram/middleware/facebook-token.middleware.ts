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
    const cookies = req.cookies as { [key: string]: string } | undefined;
    const token =
      cookies && typeof cookies === 'object' ? cookies['fb_token'] : undefined;

    if (!token) {
      throw new UnauthorizedException('fb_token cookie is missing');
    }

    req.fbToken = token;

    next();
  }
}
