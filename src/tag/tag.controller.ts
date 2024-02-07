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
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AccessTokenAuthGuard } from '@app/auth/guards/access-token.guard';
import { AdminGuard } from '@app/auth/guards/admin.guard';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async search(@Query('query') query = '', @Query('limit') limit = 7) {
    return this.tagService.search(query, Number(limit));
  }

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  async create(@Body() dto: CreateTagDto) {
    return this.tagService.create(dto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  async delete(@Param('id') id) {
    return this.tagService.delete(id);
  }
}
