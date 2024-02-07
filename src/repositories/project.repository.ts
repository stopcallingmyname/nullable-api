import { Project } from '@app/entity/project';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ProjectRepository extends BaseAbstractRepository<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);
  }
}
