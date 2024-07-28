import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { EnvVariable } from '@app/enum/env-variable.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(null, 'google') {
  constructor(readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>(EnvVariable.GoogleClientID),
      clientSecret: configService.get<string>(EnvVariable.GoogleClientSecret),
      callbackURL: configService.get<string>(EnvVariable.GoogleCallbackURL),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<void> {
    const { name, emails, id } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName === undefined ? null : name.givenName,
      lastName: name.familyName === undefined ? null : name.familyName,
    };
    done(null, user);
  }
}
