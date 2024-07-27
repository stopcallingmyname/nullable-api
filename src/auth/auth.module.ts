import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@app/auth/strategies/refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from '@app/config/jwt.config';
import { AuthService } from '@app/auth/auth.service';
import { DataBaseModule } from '@app/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities/user.entity';
import { UserRepository } from '@app/repositories/user.repository';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { Profile } from '@app/entities/profile.entity';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from '@app/user/user.module';
import { MailModule } from '@app/mail/mail.module';
import { MailService } from '@app/mail/mail.service';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    DataBaseModule,
    TypeOrmModule.forFeature([User, Profile]),
    PassportModule,
    UserModule,
    MailModule,
  ],
  providers: [
    ConfigService,
    AuthService,
    MailService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    GoogleStrategy,
    UserRepository,
    ProfileRepository,
  ],
})
export class AuthModule {}
