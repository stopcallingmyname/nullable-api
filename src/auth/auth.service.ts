// import { JwtService } from '@nestjs/jwt';
// import {
//   ConflictException,
//   Inject,
//   Injectable,
//   InternalServerErrorException,
//   Logger,
// } from '@nestjs/common';
// import { UserRepository } from '@app/repositories/user.repository';
// import { RegisterUserDto } from '@app/auth/dto/register-user.dto';
// import { ConfigService } from '@nestjs/config';
// import { EnvVariable } from '@app/enum/env-variable.enum';
// import { User } from '@app/entities/user.entity';
// import { TokenPayload } from '@app/interfaces/token-payload.interface';
// import { EMAIL_ALREADY_TAKEN, USERNAME_ALREADY_TAKEN } from './auth.constant';
// import { ProfileRepository } from '@app/repositories/profile.repository';
// import { Profile } from '@app/entities/profile.entity';
// import { GoogleUserAuthDto } from './dto/google-user-auth.dto';
// import { GoogleUserDto } from './dto/google-user.dto';
// import { UserService } from '@app/user/user.service';
// import { MailService } from '@app/mail/mail.service';
// import { SendMailDto } from '@app/mail/dto/send-mail.dto';

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { OAuth2Client } = require('google-auth-library');

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const generator = require('generate-password');

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//     private readonly mailService: MailService,
//     private readonly userRepository: UserRepository,
//     private readonly profileRepository: ProfileRepository,
//     @Inject('USER_SERVICE') private readonly userService: UserService,
//   ) {}
//   private readonly logger = new Logger(AuthService.name);

//   async register(dto: RegisterUserDto) {
//     const checkEmail = await this.userRepository.findByCondition({
//       where: { email: dto.email },
//     });

//     if (checkEmail) {
//       throw new ConflictException(EMAIL_ALREADY_TAKEN);
//     }

//     const checkUsername = await this.userRepository.findByCondition({
//       where: { username: dto.username },
//     });

//     if (checkUsername) {
//       throw new ConflictException(USERNAME_ALREADY_TAKEN);
//     }

//     const newUser = this.userRepository.create({
//       username: dto.username,
//       email: dto.email,
//       password: dto.password,
//     });

//     const user = await this.userRepository.save(newUser);
//     const payload = { id: user.id };
//     const refreshToken = await this.generateRefreshToken(payload);
//     try {
//       const newProfile: Profile = this.profileRepository.create({
//         full_name: user.username,
//         location: null,
//         bio: null,
//         personal_website_url: null,
//         avatar_url: null,
//         twitter_url: null,
//         facebook_url: null,
//         instagram_url: null,
//         github_url: null,
//         behance_url: null,
//         linkedIn_url: null,
//         vimeo_url: null,
//       });
//       newProfile.user = user;

//       await this.profileRepository.save(newProfile);

//       return {
//         refresh_token: refreshToken,
//         access_token: await this.jwtService.signAsync(payload),
//       };
//     } catch (error) {
//       throw new InternalServerErrorException(error);
//     }
//   }

//   async login(user: User) {
//     const payload = { id: user.id };
//     const refreshToken = await this.generateRefreshToken(payload);

//     return {
//       refresh_token: refreshToken,
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }

//   async authorizeWithGoogle(dto: GoogleUserAuthDto) {
//     const googleUser: GoogleUserDto = await this.googleTokenValidator(
//       dto.clientId,
//       dto.credential,
//     );

//     const existingUser: User | null = await this.userService.getByEmail(
//       googleUser.email,
//     );

//     if (existingUser) {
//       const payload = { id: existingUser.id };
//       const refresh_token = await this.generateRefreshToken(payload);

//       return {
//         refresh_token: refresh_token,
//         access_token: await this.jwtService.signAsync(payload),
//       };
//     } else {
//       const templatePassword: string = generator.generate({
//         length: 25,
//         numbers: true,
//         symbols: true,
//         exclude: '@,./[]()^*+=;#{}',
//       });

//       const newUser: User = this.userRepository.create({
//         username: googleUser.name,
//         email: googleUser.email,
//         password: templatePassword,
//       });

//       const user = await this.userRepository.save(newUser);
//       const payload = { id: user.id };
//       const refreshToken = await this.generateRefreshToken(payload);
//       try {
//         const newProfile: Profile = this.profileRepository.create({
//           full_name: googleUser.name,
//           location: null,
//           bio: null,
//           personal_website_url: null,
//           avatar_url: googleUser.picture,
//           twitter_url: null,
//           facebook_url: null,
//           instagram_url: null,
//           github_url: null,
//           behance_url: null,
//           linkedIn_url: null,
//           vimeo_url: null,
//         });
//         newProfile.user = user;

//         await this.profileRepository.save(newProfile);

//         const mailMessageDto: SendMailDto = {
//           to: googleUser.email,
//           subject: 'Welcome to .Nullable!',
//           content: {
//             name: googleUser.name,
//             password: templatePassword,
//           },
//         };

//         this.mailService.sendMail(mailMessageDto);

//         return {
//           refresh_token: refreshToken,
//           access_token: await this.jwtService.signAsync(payload),
//         };
//       } catch (error) {
//         throw new InternalServerErrorException(error);
//       }
//     }
//   }

//   async refresh(id: string) {
//     const payload = { id };

//     const refresh_token = await this.generateRefreshToken(payload);

//     return {
//       refresh_token: refresh_token,
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }

//   private async generateRefreshToken(payload: TokenPayload) {
//     const refreshToken = await this.jwtService.signAsync(payload, {
//       secret: this.configService.get<string>(EnvVariable.RefreshTokenSecret),
//       expiresIn: '15d',
//     });

//     return refreshToken;
//   }

//   private async googleTokenValidator(clientId, token) {
//     const client = new OAuth2Client(clientId);
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: clientId,
//     });
//     const payload = ticket.getPayload();
//     return payload;
//   }
// }

import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from '@app/repositories/user.repository';
import { RegisterUserDto } from '@app/auth/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '@app/enum/env-variable.enum';
import { User } from '@app/entities/user.entity';
import { TokenPayload } from '@app/interfaces/token-payload.interface';
import { EMAIL_ALREADY_TAKEN, USERNAME_ALREADY_TAKEN } from './auth.constant';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { Profile } from '@app/entities/profile.entity';
import { GoogleUserAuthDto } from './dto/google-user-auth.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { UserService } from '@app/user/user.service';
import { MailService } from '@app/mail/mail.service';
import { SendMailDto } from '@app/mail/dto/send-mail.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { OAuth2Client } = require('google-auth-library');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generator = require('generate-password');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

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
    const accessToken = await this.generateAccessToken(payload);

    try {
      const newProfile: Profile = this.profileRepository.create({
        full_name: user.username,
        location: null,
        bio: null,
        personal_website_url: null,
        avatar_url: null,
        twitter_url: null,
        facebook_url: null,
        instagram_url: null,
        github_url: null,
        behance_url: null,
        linkedIn_url: null,
        vimeo_url: null,
      });
      newProfile.user = user;

      await this.profileRepository.save(newProfile);

      return {
        refresh_token: refreshToken,
        access_token: accessToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(user: User) {
    const payload = { id: user.id };
    const refreshToken = await this.generateRefreshToken(payload);
    const accessToken = await this.generateAccessToken(payload);

    return {
      refresh_token: refreshToken,
      access_token: accessToken,
    };
  }

  async authorizeWithGoogle(dto: GoogleUserAuthDto) {
    const googleUser: GoogleUserDto = await this.googleTokenValidator(
      dto.clientId,
      dto.credential,
    );

    const existingUser: User | null = await this.userService.getByEmail(
      googleUser.email,
    );

    if (existingUser) {
      const payload = { id: existingUser.id };
      const refresh_token = await this.generateRefreshToken(payload);
      const access_token = await this.generateAccessToken(payload);

      return {
        refresh_token: refresh_token,
        access_token: access_token,
      };
    } else {
      const templatePassword: string = generator.generate({
        length: 25,
        numbers: true,
        symbols: true,
        exclude: '@,./[]()^*+=;#{}',
      });

      const newUser: User = this.userRepository.create({
        username: googleUser.name,
        email: googleUser.email,
        password: templatePassword,
      });

      const user = await this.userRepository.save(newUser);
      const payload = { id: user.id };
      const refreshToken = await this.generateRefreshToken(payload);
      const accessToken = await this.generateAccessToken(payload);

      try {
        const newProfile: Profile = this.profileRepository.create({
          full_name: googleUser.name,
          location: null,
          bio: null,
          personal_website_url: null,
          avatar_url: googleUser.picture,
          twitter_url: null,
          facebook_url: null,
          instagram_url: null,
          github_url: null,
          behance_url: null,
          linkedIn_url: null,
          vimeo_url: null,
        });
        newProfile.user = user;

        await this.profileRepository.save(newProfile);

        const mailMessageDto: SendMailDto = {
          to: googleUser.email,
          subject: 'Welcome to .Nullable!',
          content: {
            name: googleUser.name,
            password: templatePassword,
          },
        };

        this.mailService.sendMail(mailMessageDto);

        return {
          refresh_token: refreshToken,
          access_token: accessToken,
        };
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async refresh(id: string) {
    const payload = { id };

    const refresh_token = await this.generateRefreshToken(payload);
    const access_token = await this.generateAccessToken(payload);

    return {
      refresh_token: refresh_token,
      access_token: access_token,
    };
  }

  private async generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(EnvVariable.RefreshTokenSecret),
      expiresIn: '15d',
    });
  }

  private async generateAccessToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(EnvVariable.AccessTokenSecret),
      expiresIn: '1h',
    });
  }

  private async googleTokenValidator(clientId, token) {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    return payload;
  }
}
