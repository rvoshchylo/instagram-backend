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

    res.cookie('fb_token', user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    });

    res.redirect(process.env.REDIRECT_URL!);
  }
}
