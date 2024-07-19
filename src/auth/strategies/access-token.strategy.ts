// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import {
//   Injectable,
//   InternalServerErrorException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { TokenPayload } from '@app/interfaces/token-payload.interface';
// import { UserRepository } from '@app/repositories/user.repository';
// import { EnvVariable } from '@app/enum/env-variable.enum';

// @Injectable()
// export class AccessTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-access',
// ) {
//   constructor(
//     readonly configService: ConfigService,
//     private readonly userRepository: UserRepository,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get<string>(EnvVariable.AccessTokenSecret),
//     });
//   }

//   validate({ id }: TokenPayload) {
//     if (!id) {
//       throw new UnauthorizedException();
//     }

//     try {
//       const user = this.userRepository.findByCondition({
//         where: { id },
//         relations: { profile: true },
//       });
//       if (!user) {
//         throw new UnauthorizedException();
//       }
//       return user;
//     } catch (e) {
//       throw new InternalServerErrorException();
//     }
//   }
// }
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
import { EnvVariable } from '@app/enum/env-variable.enum';
import { Request } from 'express';

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
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['access_token'];
          }
          return token;
        },
      ]),
      secretOrKey: configService.get<string>(EnvVariable.AccessTokenSecret),
    });
  }

  async validate({ id }: TokenPayload) {
    if (!id) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.userRepository.findByCondition({
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
