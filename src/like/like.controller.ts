import { Controller, Post, Param, UseGuards, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { User } from '@app/entities/user.entity';
import { LikeDto } from './dto/like.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  async likeProject(@Body() dto: LikeDto, @CurrentUser() user: User) {
    return this.likeService.toggleProjectLike(dto, user.profile.id);
  }
}
