import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenPayload } from '@app/interfaces/token-payload.interface';
import { UserRepository } from '@app/repositories/user.repository';
import { EnvVariable } from '@app/enum/env-variable.enum';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractTokenFromCookie,
      ]),
      secretOrKey: configService.get(EnvVariable.RefreshTokenSecret),
    });
  }

  validate({ id }: TokenPayload) {
    if (!id) {
      throw new UnauthorizedException();
    }

    try {
      const user = this.userRepository.findByCondition({ where: { id } });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  private static extractTokenFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.refresh_token) {
      return req.cookies.refresh_token;
    }
    return null;
  }
}
