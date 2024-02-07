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
import { User } from '@app/entity/user';
import { UserRepository } from '@app/repositories/user.repository';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { Profile } from '@app/entity/profile';
import { ProfileRepository } from '@app/repositories/profile.repository';

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
  ],
  providers: [
    ConfigService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    UserRepository,
    ProfileRepository,
  ],
})
export class AuthModule {}
