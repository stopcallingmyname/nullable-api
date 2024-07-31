// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   Post,
//   Res,
//   UseGuards,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { Response } from 'express';
// import { RefreshTokenAuthGuard } from '@app/auth/guards/refresh-token.guard';
// import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
// import { AuthService } from '@app/auth/auth.service';
// import { RegisterUserDto } from '@app/auth/dto/register-user.dto';
// import { CurrentUser } from '@app/decorators/current-user.decorator';
// import { User } from '@app/entities/user.entity';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { GoogleUserAuthDto } from './dto/google-user-auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @UsePipes(new ValidationPipe())
//   @Post('register')
//   async register(
//     @Body() dto: RegisterUserDto,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { refresh_token, access_token } =
//       await this.authService.register(dto);

//     res.cookie('refresh_token', refresh_token, { httpOnly: true });

//     return {
//       access_token: access_token,
//     };
//   }

//   @HttpCode(200)
//   @Post('login')
//   @UseGuards(LocalAuthGuard)
//   async login(
//     @CurrentUser() user: User,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { refresh_token, access_token } = await this.authService.login(user);

//     res.cookie('refresh_token', refresh_token, { httpOnly: true });

//     return {
//       access_token: access_token,
//     };
//   }

//   @HttpCode(200)
//   @Post('google-login')
//   async authorizeWithGoogle(
//     @Body(ValidationPipe) dto: GoogleUserAuthDto,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { refresh_token, access_token } =
//       await this.authService.authorizeWithGoogle(dto);

//     res.cookie('refresh_token', refresh_token, { httpOnly: true });

//     return {
//       access_token: access_token,
//     };
//   }

//   @UseGuards(RefreshTokenAuthGuard)
//   @Get('refresh')
//   async refresh(
//     @CurrentUser() user: User,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { refresh_token, access_token } = await this.authService.refresh(
//       user.id,
//     );

//     res.cookie('refresh_token', refresh_token, { httpOnly: true });

//     return {
//       access_token: access_token,
//     };
//   }

//   @UseGuards(AccessTokenAuthGuard)
//   @Get('user')
//   async getUser(@CurrentUser() user: User) {
//     delete user.password;
//     return user;
//   }

//   @UseGuards(AccessTokenAuthGuard)
//   @Get('logout')
//   async logout(@Res() res: Response) {
//     res.clearCookie('refresh_token', { httpOnly: true });
//     res.clearCookie('access_token', { httpOnly: true });
//     res.status(200).json({ message: 'Logout successful' });
//   }
// }

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { RefreshTokenAuthGuard } from '@app/auth/guards/refresh-token.guard';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { AuthService } from '@app/auth/auth.service';
import { RegisterUserDto } from '@app/auth/dto/register-user.dto';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { User } from '@app/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleUserAuthDto } from './dto/google-user-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token, access_token } =
      await this.authService.register(dto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    return {
      message: 'User registered successfully',
    };
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token, access_token } = await this.authService.login(user);

    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    res.cookie('access_token', access_token, { httpOnly: true });

    return {
      message: 'User logged in successfully',
    };
  }

  @HttpCode(200)
  @Post('google-login')
  async authorizeWithGoogle(
    @Body(ValidationPipe) dto: GoogleUserAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token, access_token } =
      await this.authService.authorizeWithGoogle(dto);

    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    res.cookie('access_token', access_token, { httpOnly: true });

    return {
      message: 'User logged in with Google successfully',
    };
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refresh')
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token, access_token } = await this.authService.refresh(
      user.id,
    );

    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    res.cookie('access_token', access_token, { httpOnly: true });

    return {
      message: 'Token refreshed successfully',
    };
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('user')
  async getUser(@CurrentUser() user: User) {
    delete user.password;
    return user;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token', { httpOnly: true });
    res.clearCookie('access_token', { httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
  }
}
