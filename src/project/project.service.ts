import { ProjectRepository } from '@app/repositories/project.repository';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere, ILike, In } from 'typeorm';
import { PROJECTS_NOT_FOUND } from './project.constants';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProfileService } from '@app/profile/profile.service';
import { FileUploadService } from '@app/file-upload/file-upload.service';
import { UserService } from '@app/user/user.service';
import { Profile } from '@app/entities/profile.entity';
import { USER_NOT_FOUND } from '@app/auth/auth.constant';
import { User } from '@app/entities/user.entity';
import { UserRepository } from '@app/repositories/user.repository';
import { LikeService } from '@app/like/like.service';
import { ProfileRepository } from '@app/repositories/profile.repository';
import { SubscriptionService } from '@app/subscription/subscription.service';
import { Project } from '@app/entities/project.entity';
import { Express } from 'express';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly profileService: ProfileService,
    private readonly userRepository: UserRepository,
    private readonly fileUploadService: FileUploadService,
    private readonly likeService: LikeService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  logger = new Logger();

  // async search(
  //   userId,
  //   {
  //     search = '',
  //     sortBy = 'following',
  //     tags = [],
  //   }: {
  //     search: string;
  //     sortBy: 'new' | 'popular' | 'following';
  //     tags: string[];
  //   },
  // ) {
  //   try {
  //     this.logger.error(search);
  //     this.logger.error(sortBy);
  //     this.logger.error(tags);
  //     const projects = await this.projectRepository.findAll({
  //       where: [
  //         { ...(search && { title: ILike(`%${search}%`) }) },
  //         { ...(search && { description: ILike(`%${search}%`) }) },
  //         {
  //           ...(sortBy == 'following' &&
  //             userId && {
  //               creator: { following: { id: userId } },
  //             }),
  //         },
  //         { ...(tags?.length && { tags: { id: In([tags]) } }) },
  //       ],
  //       order: {
  //         ...(sortBy == 'new' && { created_at: 'DESC' }),
  //         ...(sortBy == 'popular' && { likes: 'DESC' }),
  //       },
  //       relations: ['creator', 'tags', 'likedBy'],
  //     });

  //     return projects;
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw new NotFoundException(PROJECTS_NOT_FOUND);
  //   }
  // }

  async search(
    userId: string,
    {
      search = '',
      sortBy = 'new',
      tags = [],
    }: {
      search: string;
      sortBy: 'new' | 'popular' | 'following';
      tags: string[];
    },
  ) {
    try {
      const whereConditions:
        | FindOptionsWhere<Project>
        | FindOptionsWhere<Project>[] = [];

      if (search) {
        whereConditions.push(
          { title: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
        );
      }

      if (sortBy === 'following' && userId) {
        whereConditions.push({
          creator: { followers: { follower: { user: { id: userId } } } },
        });
      }

      if (tags?.length) {
        whereConditions.push({ tags: { id: In(tags) } });
      }

      const projects = await this.projectRepository.findAll({
        where: whereConditions.length ? whereConditions : {},
        order: {
          ...(sortBy === 'new' && { created_at: 'DESC' }),
          ...(sortBy === 'popular' && { likes: 'DESC' }),
        },
        relations: ['creator', 'tags', 'likedBy'],
      });

      const user = await this.userRepository.findByCondition({
        where: { id: userId },
        relations: ['profile'],
      });

      // const profile = await this.profileService.getById(user.profile.id);

      if (user) {
        const projectsWithLikeInfo = await Promise.all(
          projects.map(async (project) => {
            const isLiked = await this.likeService.isProjectLikedByUser(
              project.id,
              user.profile.id,
            );
            return {
              ...project,
              isLiked,
            };
          }),
        );
        return projectsWithLikeInfo;
      } else {
        return projects;
      }
    } catch (error) {
      throw new NotFoundException(PROJECTS_NOT_FOUND);
    }
  }

  async getAllProjects() {
    try {
      return await this.projectRepository.findAll({
        relations: ['creator', 'tags', 'likedBy'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving projects',
      );
    }
  }

  async getUserProjectsByUsername(
    username: string,
    currentUserId: string | null,
  ) {
    try {
      const profile = await this.profileService.getByUsername(username, null);
      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      const projects = await this.projectRepository.findAll({
        where: { creator: { id: profile.id } },
        relations: ['creator', 'tags', 'likedBy'],
      });

      if (currentUserId) {
        const currentProfile: Profile = (await this.findUserById(currentUserId))
          ?.profile;

        if (currentProfile) {
          const projectsWithLikeInfo = await Promise.all(
            projects.map(async (project) => {
              const isLiked = await this.likeService.isProjectLikedByUser(
                project.id,
                currentProfile.id,
              );
              return {
                ...project,
                isLiked,
              };
            }),
          );
          return projectsWithLikeInfo;
        }
      }

      return projects;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving user projects',
      );
    }
  }

  async getLikedProjectsByUsername(
    username: string,
    currentUserId: string | null,
  ) {
    try {
      const profile = await this.profileService.getByUsername(username, null);
      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      const likedProjects = await this.projectRepository.findAll({
        where: { likedBy: { id: profile.id } },
        relations: ['creator', 'tags', 'likedBy'],
      });

      if (currentUserId) {
        const currentProfile: Profile = (await this.findUserById(currentUserId))
          ?.profile;

        if (currentProfile) {
          const projectsWithLikeInfo = await Promise.all(
            likedProjects.map(async (project) => {
              const isLiked = await this.likeService.isProjectLikedByUser(
                project.id,
                currentProfile.id,
              );
              return {
                ...project,
                isLiked,
              };
            }),
          );
          return projectsWithLikeInfo;
        }
      }

      return likedProjects;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving user projects',
      );
    }
  }

  async create(
    profileId,
    dto: CreateProjectDto,
    preview_img: Express.Multer.File,
  ) {
    try {
      const profile = await this.profileService.getById(profileId);

      const previewUploadResult =
        await this.fileUploadService.uploadFile(preview_img);

      if (!previewUploadResult || !previewUploadResult.cdnUrl) {
        throw new InternalServerErrorException('Failed to upload preview');
      } else {
        const newProject = await this.projectRepository.create({
          preview_url: previewUploadResult.cdnUrl,
          title: dto.title,
          description: dto.description,
          components: dto.components,
          tags: dto.tags,
          timeSpent: dto.timeSpent,
          creator: profile,
        });

        const project = await this.projectRepository.save(newProject);

        await this.updateProfileAverageTimeSpent(profileId);

        return project;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error creating project',
      );
    }
  }

  async viewProject(projectId: string, currentUserId: string | null) {
    try {
      const project = await this.projectRepository.findByCondition({
        where: { id: projectId },
        relations: ['creator', 'tags', 'likedBy'],
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const currentProfile: Profile = (await this.findUserById(currentUserId))
        ?.profile;

      if (!currentProfile || project.creator.id !== currentProfile?.id) {
        project.views += 1;
        await this.projectRepository.save(project);
      }

      return project;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving project',
      );
    }
  }

  private async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findByCondition({
      where: { id: userId },
      relations: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  private async updateProfileAverageTimeSpent(profileId: string) {
    const profile = await this.profileRepository.findByCondition({
      where: { id: profileId },
      relations: ['projects'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const totalProjects = profile.projects.length;
    const totalTimeSpent = profile.projects.reduce((total, project) => {
      return total + (project.timeSpent || 0);
    }, 0);

    profile.averageTimeSpent =
      totalProjects > 0 ? Math.round(totalTimeSpent / totalProjects) : null;
    await this.profileRepository.save(profile);
  }
}
