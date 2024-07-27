import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Project } from '@app/entities/project.entity';
import { ProfileModule } from '@app/profile/profile.module';
import { ProjectRepository } from '@app/repositories/project.repository';
import { ProjectModule } from '@app/project/project.module';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@app/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { UserRepository } from '@app/repositories/user.repository';
import { User } from '@app/entities/user.entity';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { Profile } from '@app/entities/profile.entity';

@Module({
  controllers: [LikeController],
  imports: [
    TypeOrmModule.forFeature([Project, Profile, User]),
    forwardRef(() => ProfileModule),
    forwardRef(() => ProjectModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    LikeService,
    AccessTokenStrategy,
    UserRepository,
    ProfileRepository,
    ProjectRepository,
  ],
  exports: [LikeService],
})
export class LikeModule {}
