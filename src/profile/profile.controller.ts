import { Body, Controller, Delete, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { User } from '@app/entity/user';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch()
  @UseGuards(AccessTokenAuthGuard)
  async update(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(user.profile.id, dto);
  }

  @Delete()
  @UseGuards(AccessTokenAuthGuard)
  async delete(@CurrentUser() user: User) {
    return this.profileService.delete(user.profile.id);
  }
}
