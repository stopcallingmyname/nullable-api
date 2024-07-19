import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { TagRepository } from '@app/repositories/tag.repository';
import { Profile } from '@app/entities/profile.entity';
import { User } from '@app/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/repositories/user.repository';
import { Tag } from '@app/entities/tag';

@Module({
  controllers: [TagController],
  imports: [TypeOrmModule.forFeature([Profile, User, Tag])],
  providers: [TagService, AccessTokenStrategy, TagRepository, UserRepository],
})
export class TagModule {}
