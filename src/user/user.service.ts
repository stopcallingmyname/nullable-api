import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@app/repositories/user.repository';
import { User } from '@app/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_NOT_FOUND } from '@app/auth/auth.constant';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import * as bcrypt from 'bcrypt';
import { SAME_PASSWORD, WRONG_PASSWORD } from './user.constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findByCondition({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByCondition({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findByCondition({
        where: { username: username },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  async getByProfileId(profileId: string): Promise<Partial<User>> {
    try {
      const user = await this.userRepository.findByCondition({
        where: {
          profile: { id: profileId },
        },
        relations: ['profile'],
      });

      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      const { password, role, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = this.userRepository.create(dto);

      const user: User = await this.userRepository.save({
        id: userId,
        ...updatedUser,
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePassword(
    userId: string,
    dto: UpdateUserPasswordDto,
  ): Promise<User> {
    try {
      const user: User = await this.userRepository.getById(userId);

      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      if (!(await bcrypt.compare(dto.oldPassword, user.password))) {
        throw new BadRequestException(WRONG_PASSWORD);
      }

      if (await bcrypt.compare(dto.newPassword, user.password)) {
        throw new BadRequestException(SAME_PASSWORD);
      }

      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
