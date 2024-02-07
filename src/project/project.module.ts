import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from '@app/repositories/project.repository';
import { ProfileService } from '@app/profile/profile.service';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { UserRepository } from '@app/repositories/user.repository';
import { Project } from '@app/entity/project';
import { Profile } from '@app/entity/profile';
import { User } from '@app/entity/user';

@Module({
  controllers: [ProjectController],
  imports: [TypeOrmModule.forFeature([Project, Profile, User])],
  providers: [
    ProjectService,
    ProfileService,
    ProjectRepository,
    ProfileRepository,
    UserRepository,
  ],
})
export class ProjectModule {}
