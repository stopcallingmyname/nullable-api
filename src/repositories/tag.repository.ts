import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '@app/repositories/base/base.abstract.repository';
import { Tag } from '@app/entities/tag';

@Injectable()
export class TagRepository extends BaseAbstractRepository<Tag> {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    super(tagRepository);
  }
}
