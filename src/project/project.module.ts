import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from '@app/repositories/project.repository';
import { ProfileService } from '@app/profile/profile.service';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { UserRepository } from '@app/repositories/user.repository';
import { Project } from '@app/entities/project.entity';
import { Profile } from '@app/entities/profile.entity';
import { User } from '@app/entities/user.entity';
import { ProfileModule } from '@app/profile/profile.module';
import { SubscriptionModule } from '@app/subscription/subscription.module';
import { TagRepository } from '@app/repositories/tag.repository';
import { Tag } from '@app/entities/tag';
import { FileUploadService } from '@app/file-upload/file-upload.service';
import { UserService } from '@app/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getJWTConfig } from '@app/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LikeModule } from '@app/like/like.module';
import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { LikeService } from '@app/like/like.service';
import { SubscriptionService } from '@app/subscription/subscription.service';
import { Subscription } from '@app/entities/subscription.entity';
import { SubscriptionRepository } from '@app/repositories/subscription.repository';

@Module({
  controllers: [ProjectController],
  imports: [
    TypeOrmModule.forFeature([Project, Profile, User, Tag]),
    forwardRef(() => ProfileModule),
    forwardRef(() => SubscriptionModule),
    forwardRef(() => LikeModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    ProjectService,
    AccessTokenStrategy,
    ProfileService,
    FileUploadService,
    ProjectRepository,
    ProfileRepository,
    LikeService,
    TagRepository,
    UserRepository,
  ],
})
export class ProjectModule {}
