import { TagRepository } from '@app/repositories/tag.repository';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ILike } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  TAG_ALREADY_EXISTS,
  TAG_NOT_FOUND,
  TAGS_NOT_FOUND,
} from './tag.constants';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async search(query: string, limit: number) {
    try {
      const tags = await this.tagRepository.findAll({
        where: { tag_name: ILike(`%${query}%`) },
        take: limit,
      });

      return tags;
    } catch (error) {
      throw new NotFoundException(TAGS_NOT_FOUND);
    }
  }

  async create(dto: CreateTagDto) {
    try {
      const checkName = await this.tagRepository.findByCondition({
        where: { tag_name: dto.tag_name },
      });

      if (checkName) {
        throw new ConflictException(TAG_ALREADY_EXISTS);
      }

      const newTag = await this.tagRepository.create({
        tag_name: dto.tag_name,
      });

      const tag = await this.tagRepository.save(newTag);
      return tag;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(tagId: string) {
    try {
      const tag = await this.tagRepository.findByCondition({
        where: { id: tagId },
      });

      if (!tag) {
        throw new NotFoundException(TAG_NOT_FOUND);
      }

      await this.tagRepository.remove(tag);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
