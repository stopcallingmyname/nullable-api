import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { Profile } from '@app/entities/profile.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/repositories/user.repository';
import { User } from '@app/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@app/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    { useClass: UserService, provide: 'USER_SERVICE' },
    AccessTokenStrategy,
    UserRepository,
  ],
  exports: [{ useClass: UserService, provide: 'USER_SERVICE' }],
})
export class UserModule {}
