import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRepository } from '@app/repositories/user.repository';
import { USER_NOT_FOUND_LOGIN, WRONG_PASSWORD } from '@app/auth/auth.constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({ usernameField: 'identifier' });
  }

  async validate(identifier: string, password: string) {
    try {
      const user = await this.userRepository.findByCondition({
        where: [{ email: identifier }, { username: identifier }],
      });

      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND_LOGIN);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException(WRONG_PASSWORD);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error.response.message);
    }
  }
}
