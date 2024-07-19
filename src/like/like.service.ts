import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProjectRepository } from '@app/repositories/project.repository';
import { ProfileService } from '@app/profile/profile.service';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly profileService: ProfileService,
  ) {}
  logger = new Logger();

  async toggleProjectLike(dto: LikeDto, profileId: string) {
    const project = await this.projectRepository.findByCondition({
      where: { id: dto.projectId },
      relations: { likedBy: true },
    });

    if (project.likedBy.some((profile) => profile.id == profileId)) {
      project.likedBy = project.likedBy.filter((like) => like.id != profileId);
      project.likes -= 1;

      await this.projectRepository.save(this.projectRepository.create(project));
      return;
    }

    project.likes += 1;

    await this.projectRepository.save(
      this.projectRepository.create({
        ...project,
        likedBy: [...project.likedBy, { id: profileId }],
      }),
    );

    return project;
  }

  async isProjectLikedByUser(
    projectId: string,
    userId: string,
  ): Promise<boolean> {
    const project = await this.projectRepository.findByCondition({
      where: { id: projectId },
      relations: ['likedBy'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project.likedBy.some((profile) => profile.id === userId);
  }
}
