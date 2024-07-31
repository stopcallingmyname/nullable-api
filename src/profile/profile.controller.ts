import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { User } from '@app/entities/user.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Tag } from '@app/entities/tag';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { Profile } from '@app/entities/profile.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('all')
  async getAllProfiles() {
    return this.profileService.getAllProfiles();
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  async getCurrent(@CurrentUser() user: User) {
    return user.profile;
  }

  @Get('id=:id')
  async getById(@Param('id') id) {
    return this.profileService.getById(id);
  }

  @ApiParam({ name: 'username' })
  @Get(':username')
  async getByUsername(@Param('username') username, @Req() req: Request) {
    const token = req.cookies.access_token;
    let currentUserId = null;

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync<{ id: string }>(
          token,
        );
        currentUserId = payload?.id;
      } catch (error) {
        console.error(error);
      }
    }

    return this.profileService.getByUsername(username, currentUserId);
  }

  @Patch()
  @UseGuards(AccessTokenAuthGuard)
  async update(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(user.profile.id, dto);
  }

  @Delete()
  @UseGuards(AccessTokenAuthGuard)
  async delete(@CurrentUser() user: User, @Req() req: Request) {
    req.res.clearCookie('refresh_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return this.profileService.delete(user.profile.id);
  }

  @Patch('upload-avatar')
  @UseGuards(AccessTokenAuthGuard)
  async uploadProfileAvatar(
    @CurrentUser() user: User,
    @Body('avatarUrl') avatarUrl: string,
  ) {
    return this.profileService.uploadProfileAvatar(user.profile.id, avatarUrl);
  }

  @Delete('delete-avatar')
  @UseGuards(AccessTokenAuthGuard)
  async deleteProfileAvatar(@CurrentUser() user: User) {
    return this.profileService.deleteProfileAvatar(user.profile.id);
  }

  @Patch('skills')
  @UseGuards(AccessTokenAuthGuard)
  async updateSkills(
    @CurrentUser() user: User,
    @Body() dto: UpdateSkillsDto,
  ): Promise<Profile> {
    return this.profileService.updateSkills(user.profile.id, dto);
  }

  @Delete('skills/:id')
  @UseGuards(AccessTokenAuthGuard)
  async deleteSkill(@CurrentUser() user: User, @Param('id') skillId: string) {
    return this.profileService.deleteSkill(user.profile.id, skillId);
  }
}
