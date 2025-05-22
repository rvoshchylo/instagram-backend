import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('instagram')
  @UseGuards(AuthGuard('facebook'))
  async loginWithInstagram() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as {
      accessToken: string;
      name: string;
      facebookId: string;
      email?: string;
    };

    const redirectUrl = new URL(process.env.REDIRECT_URL!);
    redirectUrl.searchParams.set('token', user.accessToken);

    return res.redirect(redirectUrl.toString());
  }
}
