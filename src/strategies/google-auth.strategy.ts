import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENTID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { name, email } = profile._json;
    const { provider } = profile;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (user.provider !== provider)
        throw new HttpException('already in use', HttpStatus.BAD_REQUEST);
      done(null, user);
    } catch (e) {
      if (e.status === 404 || e.status === undefined) {
        const newuser = await this.userService.createU({
          nickname: name,
          email,
          provider,
        });
        done(null, newuser);
      }
    }
  }
}
