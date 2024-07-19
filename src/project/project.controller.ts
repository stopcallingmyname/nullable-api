import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { User } from '@app/entities/user.entity';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('search')
  async search(
    @Req() req: Request,
    @Body()
    dto: {
      search: string;
      sortBy: 'new' | 'popular' | 'following';
      tags: string[];
    },
  ) {
    const currentUserId = await getCurrentUserId(req, this.jwtService);
    return this.projectService.search(currentUserId, dto);
  }

  @Get('all')
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get('user/:username')
  async getUserProjects(
    @Param('username') username: string,
    @Req() req: Request,
  ) {
    const currentUserId = await getCurrentUserId(req, this.jwtService);
    return this.projectService.getUserProjectsByUsername(
      username,
      currentUserId,
    );
  }

  @Get('user/likes/:username')
  async getLikedProjects(
    @Param('username') username: string,
    @Req() req: Request,
  ) {
    const currentUserId = await getCurrentUserId(req, this.jwtService);
    return this.projectService.getLikedProjectsByUsername(
      username,
      currentUserId,
    );
  }

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  @UseInterceptors(FileInterceptor('preview_img'))
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateProjectDto,
    @UploadedFile() preview_img: Express.Multer.File,
  ) {
    return this.projectService.create(user.profile.id, dto, preview_img);
  }

  @Get(':id')
  async viewProject(@Param('id') id: string, @Req() req: Request) {
    // const token = req.cookies.access_token;
    // let currentUserId = null;

    // if (token) {
    //   try {
    //     const payload = await this.jwtService.verifyAsync<{ id: string }>(
    //       token,
    //     );
    //     currentUserId = payload?.id;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    const currentUserId = await getCurrentUserId(req, this.jwtService);
    const project = await this.projectService.viewProject(id, currentUserId);
    return project;
  }

  //   @Delete
  //   async delete(@Param())
}

async function getCurrentUserId(
  req: Request,
  jwtService: JwtService,
): Promise<string | null> {
  const token = req.cookies.access_token;
  let currentUserId: string | null = null;

  if (token) {
    try {
      const payload = await jwtService.verifyAsync<{ id: string }>(token);
      currentUserId = payload?.id || null;
    } catch (error) {
      console.error(error);
    }
  }

  return currentUserId;
}
