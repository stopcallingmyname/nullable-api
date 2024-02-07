import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenPayload } from '@app/interfaces/token-payload.interface';
import { UserRepository } from '@app/repositories/user.repository';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  validate({ id }: TokenPayload) {
    if (!id) {
      throw new UnauthorizedException();
    }

    try {
      const user = this.userRepository.findByCondition({
        where: { id },
        relations: { profile: true },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
