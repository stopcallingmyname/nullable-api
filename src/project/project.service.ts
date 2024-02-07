import { ProjectRepository } from '@app/repositories/project.repository';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ILike, In } from 'typeorm';
import { PROJECTS_NOT_FOUND } from './project.constants';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProfileService } from '@app/profile/profile.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly profileService: ProfileService,
  ) {}

  async search(query: string) {
    try {
      const projects = await this.projectRepository.findAll({
        where: [
          { title: ILike(`%${query}%`) },
          { description: ILike(`%${query}%`) },
          { tags: In([query]) },
        ],
      });

      return projects;
    } catch (error) {
      throw new NotFoundException(PROJECTS_NOT_FOUND);
    }
  }

  async create(dto: CreateProjectDto) {
    try {
      const profile = await this.profileService.getById(dto.profileId);

      const newProject = await this.projectRepository.create({
        title: dto.title,
        description: dto.description,
        components: dto.components,
        tags: dto.tags,
        profile: profile,
      });

      const project = await this.projectRepository.save(newProject);
      return project;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
