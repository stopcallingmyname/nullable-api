import { ProfileRepository } from '@app/repositories/profile.repository';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { USER_NOT_FOUND } from '@app/auth/auth.constant';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getById(profileId: string) {
    try {
      const profile = await this.profileRepository.findByCondition({
        where: { id: profileId },
      });

      return profile;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  async update(profileId: string, dto: UpdateProfileDto) {
    try {
      const newProfile = this.profileRepository.create(dto);

      const profile = await this.profileRepository.save({
        id: profileId,
        ...newProfile,
      });

      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(profileId: string) {
    try {
      const profile = await this.profileRepository.findByCondition({
        where: { id: profileId },
      });

      if (!profile) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      await this.profileRepository.remove(profile);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
