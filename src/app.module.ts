import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    TagModule,
    ProjectModule,
    ConfigModule.forRoot(),
  ],
  providers: [ConfigService],
})
export class AppModule {}
