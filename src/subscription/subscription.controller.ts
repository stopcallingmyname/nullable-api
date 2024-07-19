import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { SubscriptionService } from './subscription.service';
import { FollowDto } from './dto/follow.dto';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { User } from '@app/entities/user.entity';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':id/details')
  async getSubscriptionDetails(@Param('id') id: string) {
    return this.subscriptionService.getSubscriptionDetails(id);
  }

  @Post('follow')
  @UseGuards(AccessTokenAuthGuard)
  async follow(@CurrentUser() user: User, @Body() dto: FollowDto) {
    return this.subscriptionService.follow(user.profile.id, dto);
  }

  @Post('unfollow')
  @UseGuards(AccessTokenAuthGuard)
  async unfollow(@CurrentUser() user: User, @Body() dto: FollowDto) {
    return this.subscriptionService.unfollow(user.profile.id, dto);
  }

  @Post('is_following')
  @UseGuards(AccessTokenAuthGuard)
  async isFollowing(@CurrentUser() user: User, @Body() dto: FollowDto) {
    return this.subscriptionService.isFollowing(user.profile.id, dto);
  }
}
