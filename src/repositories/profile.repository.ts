import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@app/repositories/base/base.abstract.repository';
import { Profile } from '@app/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileRepository extends BaseAbstractRepository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super(profileRepository);
  }
}
