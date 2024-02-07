import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async search(@Query('query') query = '') {
    return this.projectService.search(query);
  }

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  async create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  //   @Delete
  //   async delete(@Param())
}
