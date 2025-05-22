import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { Request, Response } from 'express';
import { RequestWithFbToken } from 'src/types/RequestWithFbToken';

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

  @Post('logout')
  async logout(@Req() req: RequestWithFbToken) {
    const fbToken = req.fbToken;

    console.log('req', req.fbToken);

    if (!fbToken) {
      return { success: false, message: 'No token provided' };
    }

    try {
      await axios.delete(`https://graph.facebook.com/v19.0/me/permissions`, {
        params: {
          access_token: fbToken,
        },
      });

      return {
        success: true,
        message: 'Facebook token successfully revoked',
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
