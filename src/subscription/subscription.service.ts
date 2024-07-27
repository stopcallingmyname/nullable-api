import { Profile } from '@app/entities/profile.entity';
import { Subscription } from '@app/entities/subscription.entity';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { SubscriptionRepository } from '@app/repositories/subscription.repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FollowDto } from './dto/follow.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getSubscriptionDetails(subscriptionId: string): Promise<any> {
    const subscription = await this.subscriptionRepository.findByCondition({
      where: { id: subscriptionId },
      relations: ['follower', 'followee'],
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with id ${subscriptionId} not found`,
      );
    }

    const followerProfile = await this.profileRepository.findByCondition({
      where: { id: subscription.follower.id },
      relations: ['user'],
    });

    const followeeProfile = await this.profileRepository.findByCondition({
      where: { id: subscription.followee.id },
      relations: ['user'],
    });

    return {
      follower: {
        id: followerProfile.id,
        username: followerProfile.user.username,
        avatarUrl: followerProfile.avatar_url,
      },
      followee: {
        id: followeeProfile.id,
        username: followeeProfile.user.username,
        avatarUrl: followeeProfile.avatar_url,
      },
    };
  }

  async follow(
    profileId: string,
    dto: FollowDto,
  ): Promise<{ followee_id: string }> {
    const followee = await this.profileRepository.findByCondition({
      where: { id: dto.followee_id },
    });
    if (!followee) {
      throw new NotFoundException(
        `Profile with id ${dto.followee_id} not found`,
      );
    }

    const follower = await this.profileRepository.findByCondition({
      where: { id: profileId },
    });
    if (!follower) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    if (follower.id === followee.id) {
      throw new ConflictException('The user can not follow himself');
    }

    const existingSubscription =
      await this.subscriptionRepository.findByCondition({
        where: {
          follower: { id: profileId },
          followee: { id: dto.followee_id },
        },
      });

    if (existingSubscription) {
      throw new ConflictException('User is already following this profile');
    }

    const subscription = await this.subscriptionRepository.create({
      follower: follower,
      followee: followee,
    });

    await this.subscriptionRepository.save(subscription);
    return { followee_id: dto.followee_id };
  }

  async unfollow(
    profileId: string,
    dto: FollowDto,
  ): Promise<{ followee_id: string }> {
    const followee = await this.profileRepository.findByCondition({
      where: { id: dto.followee_id },
    });
    if (!followee) {
      throw new NotFoundException(
        `Profile with id ${dto.followee_id} not found`,
      );
    }

    const follower = await this.profileRepository.findByCondition({
      where: { id: profileId },
    });
    if (!follower) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    const existingSubscription =
      await this.subscriptionRepository.findByCondition({
        where: {
          follower: { id: profileId },
          followee: { id: dto.followee_id },
        },
      });

    if (!existingSubscription) {
      throw new ConflictException('User is not following this profile');
    }

    await this.subscriptionRepository.remove(existingSubscription);
    return { followee_id: dto.followee_id };
  }

  async isFollowing(profileId: string, dto: FollowDto): Promise<boolean> {
    const followee = await this.profileRepository.findByCondition({
      where: { id: dto.followee_id },
    });
    if (!followee) {
      throw new NotFoundException(
        `Profile with id ${dto.followee_id} not found`,
      );
    }

    const follower = await this.profileRepository.findByCondition({
      where: { id: profileId },
    });
    if (!follower) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    const existingSubscription =
      await this.subscriptionRepository.findByCondition({
        where: {
          follower: { id: profileId },
          followee: { id: dto.followee_id },
        },
      });

    return !!existingSubscription;
  }
}
