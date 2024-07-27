import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscriptionRepository } from '@app/repositories/subscription.repository';
import { Subscription } from '@app/entities/subscription.entity';
import { Profile } from '@app/entities/profile.entity';
import { ProfileModule } from '@app/profile/profile.module';
import { ProfileRepository } from '@app/repositories/profile.repository';

@Module({
  controllers: [SubscriptionController],
  imports: [
    TypeOrmModule.forFeature([Subscription, Profile]),
    forwardRef(() => ProfileModule),
  ],
  providers: [SubscriptionService, SubscriptionRepository, ProfileRepository],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
