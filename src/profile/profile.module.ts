import { AccessTokenStrategy } from '@app/auth/strategies/access-token.strategy';
import { Profile } from '@app/entity/profile';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserRepository } from '@app/repositories/user.repository';
import { User } from '@app/entity/user';

@Module({
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([Profile, User])],
  providers: [
    ProfileService,
    AccessTokenStrategy,
    ProfileRepository,
    UserRepository,
  ],
})
export class ProfileModule {}
