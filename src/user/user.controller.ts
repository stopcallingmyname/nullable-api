import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { User } from '@app/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  async getById(@CurrentUser() user: User) {
    return this.userService.getById(user.id);
  }

  @Get('profile_id=:id')
  async getByProfileId(@Param('id') id) {
    return this.userService.getByProfileId(id);
  }

  @Patch()
  @UseGuards(AccessTokenAuthGuard)
  async update(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @Patch('password')
  @UseGuards(AccessTokenAuthGuard)
  async updatePassword(
    @CurrentUser() user: User,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    return this.userService.updatePassword(user.id, dto);
  }
}
