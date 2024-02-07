import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '@app/repositories/user.repository';
import { RegisterUserDto } from '@app/auth/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '@app/enum/env-variable.enum';
import { User } from '@app/entity/user';
import { TokenPayload } from '@app/interfaces/token-payload.interface';
import { EMAIL_ALREADY_TAKEN, USERNAME_ALREADY_TAKEN } from './auth.constant';
import { ProfileRepository } from '@app/repositories/profile.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async register(dto: RegisterUserDto) {
    const checkEmail = await this.userRepository.findByCondition({
      where: { email: dto.email },
    });

    if (checkEmail) {
      throw new ConflictException(EMAIL_ALREADY_TAKEN);
    }

    const checkUsername = await this.userRepository.findByCondition({
      where: { username: dto.username },
    });

    if (checkUsername) {
      throw new ConflictException(USERNAME_ALREADY_TAKEN);
    }

    const newUser = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    const user = await this.userRepository.save(newUser);
    const payload = { id: user.id };
    const refreshToken = await this.generateRefreshToken(payload);
    try {
      const newProfile = this.profileRepository.create({
        name: null,
        surname: null,
        bio: null,
        social_links: null,
        portfolio_url: null,
        avatar_url: null,
      });
      newProfile.user = user;

      await this.profileRepository.save(newProfile);

      return {
        refresh_token: refreshToken,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(user: User) {
    const payload = { id: user.id };

    const refreshToken = await this.generateRefreshToken(payload);

    return {
      refresh_token: refreshToken,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async refresh(id: string) {
    const payload = { id };

    const refresh_token = await this.generateRefreshToken(payload);

    return {
      refresh_token: refresh_token,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generateRefreshToken(payload: TokenPayload) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(EnvVariable.RefreshTokenSecret),
      expiresIn: '15d',
    });

    return refreshToken;
  }
}
