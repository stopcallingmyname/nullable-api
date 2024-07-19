import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { UserRepository } from '@app/repositories/user.repository';
import { Profile } from '@app/entities/profile.entity';
import { User } from '@app/entities/user.entity';
import { Subscription } from '@app/entities/subscription.entity';
import { SubscriptionModule } from '@app/subscription/subscription.module';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@app/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { Tag } from '@app/entities/tag';
import { TagRepository } from '@app/repositories/tag.repository';
import { LikeModule } from '@app/like/like.module';
import { SubscriptionService } from '@app/subscription/subscription.service';

@Module({
  controllers: [ProfileController],
  imports: [
    TypeOrmModule.forFeature([Profile, User, Tag, Subscription]),
    forwardRef(() => SubscriptionModule),
    forwardRef(() => LikeModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    ProfileService,
    AccessTokenStrategy,
    ProfileRepository,
    TagRepository,
    UserRepository,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
