import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, StrategyOptions } from 'passport-facebook';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    const options: StrategyOptions = {
      clientID: configService.getOrThrow<string>('FB_APP_ID') ?? '',
      clientSecret: configService.getOrThrow<string>('FB_APP_SECRET'),
      callbackURL: configService.getOrThrow<string>('FB_CALLBACK_URL'),
      scope: [
        'public_profile',
        'email',
        'pages_show_list',
        'pages_read_engagement',
        'instagram_basic',
        'instagram_manage_insights',
        'pages_read_user_content',
        'instagram_content_publish',
      ],
      profileFields: ['id', 'displayName', 'emails'],
    };

    super(options);
  }

  validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails } = profile;
    const user = {
      facebookId: id,
      name: displayName,
      email: emails,
      accessToken,
    };

    done(null, user);
  }
}
