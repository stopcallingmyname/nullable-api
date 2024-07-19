import { ProfileRepository } from '@app/repositories/profile.repository';
import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  AVATAR_ALREADY_DELETED,
  INVALID_AVATAR_URL,
  PROFILE_NOT_FOUND,
  USER_NOT_FOUND,
} from '@app/auth/auth.constant';
import { UserRepository } from '@app/repositories/user.repository';
import { Profile } from '@app/entities/profile.entity';
import { User } from '@app/entities/user.entity';
import { SubscriptionService } from '@app/subscription/subscription.service';
import { Tag } from '@app/entities/tag';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { TagRepository } from '@app/repositories/tag.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly tagRepository: TagRepository,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
  ) {}

  logger = new Logger();

  async getAllProfiles() {
    try {
      return await this.profileRepository.findAll({
        relations: ['skills'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving profiles',
      );
    }
  }

  async getById(profileId: string) {
    try {
      const profile = await this.profileRepository.findByCondition({
        where: { id: profileId },
        relations: ['followers', 'following', 'skills', 'likedProjects'],
      });

      if (!profile) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      return {
        ...profile,
        followers_count: profile.followers.length,
        following_count: profile.following.length,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  async getByUsername(
    username: string,
    currentUserId: string | null,
  ): Promise<any> {
    const user = await this.findUserByUsername(username);

    const projects_count = user.profile.projects?.length || 0;
    const likes_count = user.profile.projects
      ? user.profile.projects.reduce((acc, project) => acc + project.likes, 0)
      : 0;

    if (!currentUserId) {
      return this.buildProfileResponse(
        user,
        false,
        false,
        projects_count,
        likes_count,
      );
    }

    const currentUser = await this.findUserById(currentUserId);

    const isCurrent = this.checkIfCurrentUser(user, currentUser);
    const isFollowing = await this.checkIfFollowing(
      currentUser,
      user,
      isCurrent,
    );

    return this.buildProfileResponse(
      user,
      isCurrent,
      isFollowing,
      projects_count,
      likes_count,
    );
  }

  async update(profileId: string, dto: UpdateProfileDto): Promise<Profile> {
    try {
      const profile: Profile = await this.profileRepository.getById(profileId);

      if (!profile) {
        throw new NotFoundException(PROFILE_NOT_FOUND);
      }

      Object.assign(profile, dto);

      const updatedProfile = await this.profileRepository.save(profile);
      return updatedProfile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadProfileAvatar(profileId: string, avatarUrl: string) {
    try {
      if (!isValidUrl(avatarUrl)) {
        throw new BadRequestException(INVALID_AVATAR_URL);
      }

      const profile: Profile = await this.profileRepository.getById(profileId);

      if (!profile) {
        throw new NotFoundException(PROFILE_NOT_FOUND);
      }

      profile.avatar_url = avatarUrl;

      const updatedProfile = await this.profileRepository.save(profile);

      return updatedProfile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteProfileAvatar(profileId: string) {
    try {
      const profile: Profile = await this.profileRepository.getById(profileId);

      if (!profile) {
        throw new NotFoundException(PROFILE_NOT_FOUND);
      }

      if (profile.avatar_url == null || profile.avatar_url === '') {
        throw new ConflictException(AVATAR_ALREADY_DELETED);
      } else {
        profile.avatar_url = null;
      }

      const updatedProfile = await this.profileRepository.save(profile);

      return updatedProfile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(profileId: string): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findByCondition({
        where: { id: profileId },
      });

      if (!profile) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      return await this.profileRepository.remove(profile);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateSkills(
    profileId: string,
    dto: UpdateSkillsDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findByCondition({
      where: { id: profileId },
      relations: { skills: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (!dto.skills || !Array.isArray(dto.skills)) {
      throw new BadRequestException('Invalid skills data');
    }

    const currentSkills = profile.skills;

    const newSkills = await Promise.all(
      dto.skills.map((skillName) => this.preloadSkillByName(skillName)),
    );

    const uniqueSkills = [...currentSkills, ...newSkills].reduce(
      (acc, skill) => {
        if (!acc.find((s) => s.id === skill.id)) {
          acc.push(skill);
        }
        return acc;
      },
      [],
    );

    profile.skills = uniqueSkills;
    return this.profileRepository.save(profile);
  }

  private async preloadSkillByName(skillName: string): Promise<Tag> {
    let skill = await this.tagRepository.findByCondition({
      where: { tag_name: skillName },
    });
    if (!skill) {
      skill = this.tagRepository.create({ tag_name: skillName });
      await this.tagRepository.save(skill);
    }
    return skill;
  }

  async deleteSkill(profileId: string, skillId: string): Promise<Profile> {
    const profile = await this.profileRepository.findByCondition({
      where: { id: profileId },
      relations: { skills: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const skillIndex = profile.skills.findIndex(
      (skill) => skill.id === skillId,
    );

    if (skillIndex !== -1) {
      profile.skills.splice(skillIndex, 1);
    } else {
      throw new NotFoundException('Skill not found');
    }

    return this.profileRepository.save(profile);
  }

  private async findUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByCondition({
      where: { username },
      relations: {
        profile: {
          followers: true,
          following: true,
          skills: true,
          projects: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  private async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findByCondition({
      where: { id: userId },
      relations: {
        profile: {
          followers: true,
          following: true,
          skills: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  private checkIfCurrentUser(user: User, currentUser: User): boolean {
    return user.profile.id === currentUser.profile.id;
  }

  private async checkIfFollowing(
    currentUser: User,
    user: User,
    isCurrent: boolean,
  ): Promise<boolean> {
    if (isCurrent) {
      return false;
    }

    return this.subscriptionService.isFollowing(currentUser.profile.id, {
      followee_id: user.profile.id,
    });
  }

  private buildProfileResponse(
    user: User,
    isCurrent: boolean,
    isFollowing: boolean,
    projects_count?: number,
    likes_count?: number,
  ): any {
    return {
      ...user.profile,
      followers_count: user.profile.followers?.length,
      following_count: user.profile.following?.length,
      projects_count,
      likes_count,
      isCurrent,
      isFollowing,
    };
  }
}

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
