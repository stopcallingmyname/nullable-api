import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    SubscriptionModule,
    UserModule,
    TagModule,
    ProjectModule,
    MailModule,
    FileUploadModule,
    LikeModule,
    ConfigModule.forRoot(),
  ],
  providers: [ConfigService],
})
export class AppModule {}
